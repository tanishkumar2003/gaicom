import { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';

export default function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = (value) => {
    if (!value.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setError(err);
      return;
    }
    setError('');
    setSubmitted(true);
    setEmail('');
  };

  if (submitted) {
    return (
      <div className={compact ? '' : 'text-center'}>
        <p className="text-accent font-medium">Thank you for subscribing!</p>
        <p className="text-gray-400 text-sm mt-1">We'll keep you posted on the latest from GAICOM.</p>
      </div>
    );
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            required
            aria-label="Email address"
            aria-invalid={error ? 'true' : undefined}
            className="flex-1 bg-surface-light border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <Button type="submit" size="small">
            Subscribe
          </Button>
        </div>
        {error && <p className="text-red-400 text-xs" role="alert">{error}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <FormInput
          type="email"
          name="newsletter-email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          error={error}
          required
          label="Email"
          className="flex-1"
        />
        <div className="sm:pt-6">
          <Button type="submit" fullWidth>
            Subscribe
          </Button>
        </div>
      </div>
    </form>
  );
}
