import { Link } from 'react-router-dom';
import SectionWrapper from '../components/SectionWrapper';
import GaicomLogo from '../components/GaicomLogo';

export default function DonateCancel() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <GaicomLogo size={44} className="text-accent mx-auto mb-4" />

          {/* X icon */}
          <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Donation Cancelled
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            Your donation was not processed. No charges have been made.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-gray-300 leading-relaxed mb-8">
            If you experienced any issues or have questions, feel free to reach out to us at{' '}
            <a href="mailto:gaicomnj@gmail.com" className="text-accent hover:underline">
              gaicomnj@gmail.com
            </a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-accent text-white font-semibold hover:bg-accent-dark transition-colors"
            >
              Try Again
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-accent text-accent font-semibold hover:bg-accent hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
