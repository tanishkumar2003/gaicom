// ============================================================
// GAICOM Lambda — Stripe Donations + Newsletter
// Runtime: Node.js 20.x
// ============================================================
// REQUIRED ENVIRONMENT VARIABLES (set in Lambda Configuration):
//   STRIPE_SECRET_KEY            = sk_test_...
//   STRIPE_WEBHOOK_SECRET        = whsec_...
//   SUCCESS_URL                  = http://gaicom-test-v1.s3-website-us-east-1.amazonaws.com/donate/success
//   CANCEL_URL                   = http://gaicom-test-v1.s3-website-us-east-1.amazonaws.com/donate/cancel
//   GOOGLE_SERVICE_ACCOUNT_JSON  = {"type":"service_account",...}
//   SPREADSHEET_ID               = your-google-spreadsheet-id
// ============================================================

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { google } = require('googleapis');

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://gaicom-test-v1.s3-website-us-east-1.amazonaws.com',
];

function getCorsHeaders(event) {
  const origin = event?.headers?.origin || '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'content-type, stripe-signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

function parseBody(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf-8')
    : event.body;
  return JSON.parse(raw);
}

// ── Newsletter handler ──
async function handleNewsletter(event, cors) {
  let body;
  try {
    body = parseBody(event);
  } catch {
    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid JSON body' }),
    };
  }

  const firstName = (body.firstName || '').trim();
  const lastName = (body.lastName || '').trim();
  const email = (body.email || '').trim();

  // Validate
  const errors = {};
  if (!firstName) errors.firstName = 'First name is required.';
  if (!lastName) errors.lastName = 'Last name is required.';
  if (!email) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      statusCode: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Validation failed', errors }),
    };
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[firstName, lastName, email, new Date().toISOString()]],
      },
    });

    console.log('Newsletter signup:', email);

    return {
      statusCode: 200,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Newsletter error:', err.message);
    return {
      statusCode: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to save subscription' }),
    };
  }
}

exports.handler = async (event) => {
  const cors = getCorsHeaders(event);

  // Handle CORS preflight
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return { statusCode: 204, headers: cors, body: '' };
  }

  const path = event.rawPath || '';
  const method = event.requestContext?.http?.method || '';

  // ── POST /create-checkout-session ──
  if (method === 'POST' && path === '/create-checkout-session') {
    try {
      let body;
      try {
        body = parseBody(event);
      } catch {
        return {
          statusCode: 400,
          headers: { ...cors, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Invalid JSON body' }),
        };
      }

      const amount = Number(body.amount);
      if (!amount || amount < 1 || amount > 5000) {
        return {
          statusCode: 400,
          headers: { ...cors, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Amount must be between $1 and $5,000' }),
        };
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'GAICOM Donation' },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        success_url: process.env.SUCCESS_URL + '?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: process.env.CANCEL_URL,
      });

      return {
        statusCode: 200,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: session.url }),
      };
    } catch (err) {
      console.error('Checkout error:', err.message);
      return {
        statusCode: 500,
        headers: { ...cors, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to create checkout session' }),
      };
    }
  }

  // ── POST /webhook ──
  if (method === 'POST' && path === '/webhook') {
    const sig = event.headers?.['stripe-signature'];
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body, 'base64').toString('utf-8')
      : event.body;

    let stripeEvent;
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return { statusCode: 400, body: 'Webhook signature verification failed' };
    }

    if (stripeEvent.type === 'checkout.session.completed') {
      const session = stripeEvent.data.object;
      console.log('=== DONATION RECEIVED ===');
      console.log('Session ID:', session.id);
      console.log('Amount:', session.amount_total / 100, session.currency?.toUpperCase());
      console.log('Email:', session.customer_details?.email || 'N/A');
      console.log('========================');
    }

    return { statusCode: 200, body: JSON.stringify({ received: true }) };
  }

  // ── POST /newsletter ──
  if (method === 'POST' && path === '/newsletter') {
    return handleNewsletter(event, cors);
  }

  // ── Fallback ──
  return {
    statusCode: 404,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: 'Not found' }),
  };
};
