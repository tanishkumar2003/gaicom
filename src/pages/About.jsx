import { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import TeamSection from '../components/TeamSection';
import GaicomLogo from '../components/GaicomLogo';
import { client } from '../lib/sanityClient';
import { ABOUT_PAGE_QUERY } from '../lib/sanityQueries';

const FALLBACK_VALUES = [
  {
    title: 'Accessibility',
    icon: '\u2316',
    desc: 'AI education should be available to everyone, regardless of background or resources.',
  },
  {
    title: 'Community',
    icon: '\u2691',
    desc: 'We grow stronger when we learn and build together as a community.',
  },
  {
    title: 'Responsibility',
    icon: '\u2696',
    desc: 'AI should be adopted thoughtfully, ethically, and with full transparency.',
  },
  {
    title: 'Empowerment',
    icon: '\u2B06',
    desc: 'Our goal is to give people the skills and confidence to use AI on their own terms.',
  },
];

const FALLBACK_ABOUT = {
  heroHeading: 'Our Story',
  heroSubheading:
    'Founded in Livingston, NJ, GAICOM is a nonprofit dedicated to making generative AI accessible, understandable, and beneficial for every community.',
  storyHeading: 'Why We Exist',
  storyParagraphs: [
    'Generative AI is transforming every industry and aspect of daily life. Yet many communities \u2014 particularly those in underserved areas \u2014 lack the resources, training, and support needed to benefit from these advances.',
    'GAICOM was founded to bridge this gap. We believe that AI literacy is the new digital literacy, and that everyone deserves access to the tools and knowledge that will shape our collective future.',
    'Our programs bring hands-on AI education to educators, small business owners, nonprofit leaders, and individuals. We provide workshops, curated resources, and a supportive community where people can learn, experiment, and grow together.',
  ],
  valuesHeading: 'Our Values',
  valuesSubheading: 'The principles that guide everything we do at GAICOM.',
};

export default function About() {
  const [values, setValues] = useState(FALLBACK_VALUES);
  const [about, setAbout] = useState(FALLBACK_ABOUT);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const data = await client.fetch(ABOUT_PAGE_QUERY);
        if (data) {
          setAbout({
            heroHeading: data.heroHeading || FALLBACK_ABOUT.heroHeading,
            heroSubheading: data.heroSubheading || FALLBACK_ABOUT.heroSubheading,
            storyHeading: data.storyHeading || FALLBACK_ABOUT.storyHeading,
            storyParagraphs:
              data.storyParagraphs && data.storyParagraphs.length > 0
                ? data.storyParagraphs
                : FALLBACK_ABOUT.storyParagraphs,
            valuesHeading: data.valuesHeading || FALLBACK_ABOUT.valuesHeading,
            valuesSubheading: data.valuesSubheading || FALLBACK_ABOUT.valuesSubheading,
          });
          if (data.values && data.values.length > 0) {
            setValues(
              data.values.map((v) => ({
                title: v.title,
                icon: v.icon || '',
                desc: v.description,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to fetch about page from Sanity:', err);
      }
    }
    fetchAbout();
  }, []);

  return (
    <>
      {/* Hero — Our Story */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-light" aria-hidden="true" />

        {/* Radial glow behind heading */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,141,253,0.35) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        {/* Abstract AI grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="about-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="0.3" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center about-fade-in">
          <GaicomLogo size={48} className="text-accent mx-auto mb-5" />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
            About GAICOM
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {about.heroHeading}
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-8" aria-hidden="true" />
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {about.heroSubheading}
          </p>
        </div>
      </section>

      {/* Why We Exist */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto about-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{about.storyHeading}</h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            {about.storyParagraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Our Values */}
      <SectionWrapper dark>
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{about.valuesHeading}</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              {about.valuesSubheading}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className="group relative bg-gradient-to-br from-surface to-surface-light rounded-xl border-l-4 border-accent/60 border-t border-r border-b border-t-white/5 border-r-white/5 border-b-white/5 p-6 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/5 hover:border-l-accent transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl text-accent/70 group-hover:text-accent transition-colors duration-300 mt-0.5 shrink-0">
                    {value.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Meet Our Team */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            The people behind GAICOM bring together expertise in AI, finance,
            technology, design, and community development.
          </p>
        </div>
        <TeamSection />
      </SectionWrapper>
    </>
  );
}
