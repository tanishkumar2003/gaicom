import SectionWrapper from '../components/SectionWrapper';
import TeamSection from '../components/TeamSection';

export default function About() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            About GAICOM
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Story
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Founded in Livingston, NJ, GAICOM is a nonprofit dedicated to making
            generative AI accessible, understandable, and beneficial for every community.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Why We Exist</h2>
          <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
            <p>
              Generative AI is transforming every industry and aspect of daily life. Yet
              many communities—particularly those in underserved areas—lack the resources,
              training, and support needed to benefit from these advances.
            </p>
            <p>
              GAICOM was founded to bridge this gap. We believe that AI literacy is the
              new digital literacy, and that everyone deserves access to the tools and
              knowledge that will shape our collective future.
            </p>
            <p>
              Our programs bring hands-on AI education to educators, small business owners,
              nonprofit leaders, and individuals. We provide workshops, curated resources,
              and a supportive community where people can learn, experiment, and grow together.
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Accessibility', desc: 'AI education should be available to everyone, regardless of background or resources.' },
              { title: 'Community', desc: 'We grow stronger when we learn and build together as a community.' },
              { title: 'Responsibility', desc: 'AI should be adopted thoughtfully, ethically, and with full transparency.' },
              { title: 'Empowerment', desc: 'Our goal is to give people the skills and confidence to use AI on their own terms.' },
            ].map((value) => (
              <div key={value.title} className="bg-surface rounded-xl border border-white/5 p-6">
                <h3 className="text-lg font-semibold text-accent mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The people behind GAICOM bring together expertise in AI, education,
            community development, and technology.
          </p>
        </div>
        <TeamSection />
      </SectionWrapper>
    </>
  );
}
