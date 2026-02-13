import SectionWrapper from '../components/SectionWrapper';
import PartnerList from '../components/PartnerList';

export default function Partners() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Our Partners
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Partners & Supporters
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            GAICOM collaborates with organizations that share our vision of making
            AI accessible and beneficial for all communities.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <PartnerList />
      </SectionWrapper>
    </>
  );
}
