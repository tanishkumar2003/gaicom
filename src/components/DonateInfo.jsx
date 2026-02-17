import { useState, useEffect } from 'react';
import Button from './Button';
import { client } from '../lib/sanityClient';
import { DONATION_TIERS_QUERY, DONATE_PAGE_QUERY } from '../lib/sanityQueries';

const API_BASE = import.meta.env.VITE_DONATE_API_BASE || '';

const FALLBACK_TIERS = [
  {
    amount: 25,
    label: 'Supporter',
    description: 'Provides AI resource materials for one community member.',
  },
  {
    amount: 50,
    label: 'Advocate',
    description: 'Funds one seat in an AI workshop for an underserved community member.',
    featured: true,
  },
  {
    amount: 100,
    label: 'Champion',
    description: 'Sponsors a full workshop session for a local school or nonprofit.',
  },
  {
    amount: 500,
    label: 'Visionary',
    description: 'Funds a complete community AI training program reaching dozens of people.',
  },
];

const FALLBACK_IMPACT = {
  impactHeading: 'Your Impact Matters',
  impactDescription:
    'Every contribution helps us reach more communities with AI education and resources. In the past year, donations like yours have helped us:',
  impactStats: [
    'Train 500+ educators in AI tools',
    'Host 30+ free community workshops',
    'Provide resources to 50+ nonprofits',
    'Reach 10,000+ community members',
  ],
  testimonialQuote:
    "GAICOM's programs gave our nonprofit the AI skills we needed to double our outreach \u2014 without doubling our budget.",
  testimonialAuthor: 'Community Impact Alliance',
  customAmountMin: 1,
  customAmountMax: 5000,
};

async function startCheckout(amount) {
  const res = await fetch(`${API_BASE}/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Payment request failed');
  }

  const { url } = await res.json();
  window.location.href = url;
}

export default function DonateInfo() {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [tiers, setTiers] = useState(FALLBACK_TIERS);
  const [impact, setImpact] = useState(FALLBACK_IMPACT);

  useEffect(() => {
    async function fetchDonateData() {
      try {
        const [tiersData, pageData] = await Promise.all([
          client.fetch(DONATION_TIERS_QUERY),
          client.fetch(DONATE_PAGE_QUERY),
        ]);
        if (tiersData && tiersData.length > 0) {
          setTiers(
            tiersData.map((t) => ({
              amount: t.amount,
              label: t.label,
              description: t.description,
              featured: t.featured || false,
            }))
          );
        }
        if (pageData) {
          setImpact({
            impactHeading: pageData.impactHeading || FALLBACK_IMPACT.impactHeading,
            impactDescription: pageData.impactDescription || FALLBACK_IMPACT.impactDescription,
            impactStats: pageData.impactStats && pageData.impactStats.length > 0 ? pageData.impactStats : FALLBACK_IMPACT.impactStats,
            testimonialQuote: pageData.testimonialQuote || FALLBACK_IMPACT.testimonialQuote,
            testimonialAuthor: pageData.testimonialAuthor || FALLBACK_IMPACT.testimonialAuthor,
            customAmountMin: pageData.customAmountMin || FALLBACK_IMPACT.customAmountMin,
            customAmountMax: pageData.customAmountMax || FALLBACK_IMPACT.customAmountMax,
          });
        }
      } catch (err) {
        console.error('Failed to fetch donation data from Sanity:', err);
      }
    }
    fetchDonateData();
  }, []);

  async function handleDonate(amount, key) {
    setError('');
    setLoading(key);
    try {
      await startCheckout(amount);
    } catch (err) {
      setError(err.message);
      setLoading(null);
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {tiers.map((tier) => (
          <div
            key={tier.label}
            className={`rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 ${
              tier.featured
                ? 'bg-accent/10 border-2 border-accent shadow-lg shadow-accent/10'
                : 'bg-surface border border-white/5 hover:border-accent/20'
            }`}
          >
            {tier.featured && (
              <span className="inline-block bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Most Popular
              </span>
            )}
            <p className="text-3xl font-bold text-white mb-1">${tier.amount}</p>
            <p className="text-accent font-semibold mb-3">{tier.label}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{tier.description}</p>
            <Button
              variant={tier.featured ? 'primary' : 'outline'}
              size="small"
              fullWidth
              disabled={loading !== null}
              onClick={() => handleDonate(tier.amount, tier.label)}
            >
              {loading === tier.label ? 'Redirecting\u2026' : `Donate $${tier.amount}`}
            </Button>
          </div>
        ))}
      </div>

      {/* Custom amount */}
      <div className="bg-surface rounded-2xl border border-white/5 p-6 md:p-8 mb-16 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Custom Amount</h3>
        <p className="text-gray-400 text-sm mb-5">
          Enter any amount between ${impact.customAmountMin} and ${impact.customAmountMax.toLocaleString()}.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <div className="relative w-full sm:w-auto sm:flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
            <input
              type="number"
              min={impact.customAmountMin}
              max={impact.customAmountMax}
              step="1"
              placeholder="0"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full rounded-lg bg-navy border border-white/10 text-white pl-8 pr-4 py-3 text-lg focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent placeholder:text-gray-600"
            />
          </div>
          <Button
            variant="primary"
            disabled={loading !== null || !customAmount || Number(customAmount) < impact.customAmountMin || Number(customAmount) > impact.customAmountMax}
            onClick={() => handleDonate(Number(customAmount), 'custom')}
          >
            {loading === 'custom' ? 'Redirecting\u2026' : 'Donate'}
          </Button>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-white/5 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{impact.impactHeading}</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              {impact.impactDescription}
            </p>
            <ul className="space-y-2">
              {impact.impactStats.map((item) => (
                <li key={item} className="flex items-center gap-2 text-gray-300 text-sm">
                  <svg className="w-4 h-4 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface-light rounded-xl p-6 border border-white/5">
            <blockquote className="italic text-gray-300 leading-relaxed mb-4">
              &ldquo;{impact.testimonialQuote}&rdquo;
            </blockquote>
            <p className="text-white font-semibold text-sm">&mdash; {impact.testimonialAuthor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
