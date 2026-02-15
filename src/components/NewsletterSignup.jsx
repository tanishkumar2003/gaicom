import { useState } from 'react';
import FormInput from './FormInput';
import Button from './Button';

const API_BASE = import.meta.env.VITE_DONATE_API_BASE || '';

export default function NewsletterSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!firstName.trim()) errs.firstName = 'First name is required.';
    if (!lastName.trim()) errs.lastName = 'Last name is required.';
    if (!email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please enter a valid email.';
    }
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setServerError('');
    setStatus('loading');

    try {
      const res = await fetch(`${API_BASE}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Subscription failed');
      }

      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (err) {
      setServerError(err.message);
      setStatus('error');
    }
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  if (status === 'success') {
    return (
      <div className="text-center">
        <p className="text-accent font-medium">Thank you for subscribing!</p>
        <p className="text-gray-400 text-sm mt-1">We&apos;ll keep you posted on the latest from GAICOM.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-2xl mx-auto">
      {serverError && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm text-center">
          {serverError}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
        <FormInput
          name="newsletter-first-name"
          placeholder="First name"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value); clearError('firstName'); }}
          error={errors.firstName}
          required
          label="First Name"
        />
        <FormInput
          name="newsletter-last-name"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => { setLastName(e.target.value); clearError('lastName'); }}
          error={errors.lastName}
          required
          label="Last Name"
        />
        <FormInput
          type="email"
          name="newsletter-email"
          placeholder="Email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
          error={errors.email}
          required
          label="Email"
        />
        <div className="sm:pt-6">
          <Button type="submit" fullWidth disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </Button>
        </div>
      </div>
    </form>
  );
}
