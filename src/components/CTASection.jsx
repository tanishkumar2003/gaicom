import { useState, useEffect } from 'react';
import Button from './Button';
import { client } from '../lib/sanityClient';
import { HOME_PAGE_QUERY } from '../lib/sanityQueries';

const FALLBACK_CTA = {
  ctaHeading: 'Ready to Shape the Future with AI?',
  ctaSubheading:
    'Join GAICOM and help build a community where everyone benefits from the power of generative AI. Your support makes a difference.',
};

export default function CTASection() {
  const [cta, setCta] = useState(FALLBACK_CTA);

  useEffect(() => {
    async function fetchCta() {
      try {
        const data = await client.fetch(HOME_PAGE_QUERY);
        if (data && (data.ctaHeading || data.ctaSubheading)) {
          setCta({
            ctaHeading: data.ctaHeading || FALLBACK_CTA.ctaHeading,
            ctaSubheading: data.ctaSubheading || FALLBACK_CTA.ctaSubheading,
          });
        }
      } catch (err) {
        console.error('Failed to fetch CTA data from Sanity:', err);
      }
    }
    fetchCta();
  }, []);

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-surface to-navy-dark" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 50%, rgba(79,141,253,0.12) 0%, transparent 50%), radial-gradient(circle at 70% 50%, rgba(79,141,253,0.08) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {cta.ctaHeading}
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {cta.ctaSubheading}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/donate" size="large" className="w-full sm:w-auto">
            Donate Now
          </Button>
          <Button to="/about" variant="outline" size="large" className="w-full sm:w-auto">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
