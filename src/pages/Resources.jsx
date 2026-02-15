import SectionWrapper from '../components/SectionWrapper';
import ResourceList from '../components/ResourceList';
import GaicomLogo from '../components/GaicomLogo';

export default function Resources() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GaicomLogo size={44} className="text-accent mx-auto mb-4" />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Learn & Grow
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Resources
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of guides, tools, and research to help
            you navigate the world of generative AI.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <ResourceList />
      </SectionWrapper>
    </>
  );
}
