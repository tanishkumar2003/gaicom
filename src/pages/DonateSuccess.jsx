import { useSearchParams, Link } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';
import GaicomLogo from '../components/GaicomLogo';

export default function DonateSuccess() {
  const [params] = useSearchParams();
  const sessionId = params.get('session_id');

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <GaicomLogo size={44} className="text-accent mx-auto mb-4" />

          {/* Checkmark icon */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Thank You!
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-2">
            Your donation has been received. You&apos;re helping us bring AI education
            and resources to communities that need them most.
          </p>
          {sessionId && (
            <p className="text-gray-500 text-sm mt-4">
              Reference: {sessionId.slice(0, 24)}…
            </p>
          )}
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-300 leading-relaxed mb-8">
            A confirmation email will be sent to the address you provided during checkout.
            If you have any questions about your donation, contact us at{' '}
            <a href="mailto:gaicomnj@gmail.com" className="text-accent hover:underline">
              gaicomnj@gmail.com
            </a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-dark transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-colors"
            >
              Make Another Donation
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
