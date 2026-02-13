import SectionWrapper from '../components/SectionWrapper';
import DonateInfo from '../components/DonateInfo';

export default function Donate() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(79,141,253,0.12) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Support Our Mission
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Make a Difference
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Your donation fuels AI education, community workshops, and resources
            that empower people to thrive in an AI-driven world.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Choose Your Impact
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Every contribution, no matter the size, helps us bring AI education
            and resources to communities that need them most.
          </p>
        </div>
        <DonateInfo />
      </SectionWrapper>
    </>
  );
}
