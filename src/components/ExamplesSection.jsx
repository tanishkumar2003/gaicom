import { useState, useEffect } from 'react';
import SectionWrapper from './SectionWrapper';
import Card from './Card';
import { client } from '../lib/sanityClient';
import { HOME_PAGE_QUERY } from '../lib/sanityQueries';

const FALLBACK_EXAMPLES = [
  {
    icon: '\u270D\uFE0F',
    title: 'Content Creation',
    description:
      'Generate blog posts, social media content, and marketing copy faster with AI writing assistants.',
  },
  {
    icon: '\uD83C\uDFA8',
    title: 'Design & Visual Arts',
    description:
      'Create graphics, illustrations, and visual assets using AI-powered design tools.',
  },
  {
    icon: '\uD83D\uDCCA',
    title: 'Data Analysis',
    description:
      'Transform raw data into actionable insights with AI-driven analytics and visualization.',
  },
  {
    icon: '\uD83C\uDF93',
    title: 'Personalized Education',
    description:
      'Build adaptive learning experiences that meet every student where they are.',
  },
  {
    icon: '\uD83D\uDCAC',
    title: 'Customer Support',
    description:
      'Deploy intelligent chatbots and support systems that improve response time and satisfaction.',
  },
  {
    icon: '\uD83D\uDD2C',
    title: 'Research & Discovery',
    description:
      'Accelerate research workflows with AI that summarizes papers, finds patterns, and generates hypotheses.',
  },
];

const FALLBACK_EXAMPLES_TEXT = {
  examplesHeading: 'AI in Action',
  examplesSubheading:
    'Discover how communities and organizations are already leveraging generative AI to transform their work and create new possibilities.',
};

export default function ExamplesSection() {
  const [examples, setExamples] = useState(FALLBACK_EXAMPLES);
  const [text, setText] = useState(FALLBACK_EXAMPLES_TEXT);

  useEffect(() => {
    async function fetchExamples() {
      try {
        const data = await client.fetch(HOME_PAGE_QUERY);
        if (data) {
          if (data.examplesHeading || data.examplesSubheading) {
            setText({
              examplesHeading: data.examplesHeading || FALLBACK_EXAMPLES_TEXT.examplesHeading,
              examplesSubheading: data.examplesSubheading || FALLBACK_EXAMPLES_TEXT.examplesSubheading,
            });
          }
          if (data.examples && data.examples.length > 0) {
            setExamples(
              data.examples.map((e) => ({
                icon: e.icon || '',
                title: e.title,
                description: e.description,
              }))
            );
          }
        }
      } catch (err) {
        console.error('Failed to fetch examples from Sanity:', err);
      }
    }
    fetchExamples();
  }, []);

  return (
    <SectionWrapper dark id="examples">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Real-World Applications
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {text.examplesHeading}
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          {text.examplesSubheading}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example) => (
          <Card
            key={example.title}
            icon={<span aria-hidden="true">{example.icon}</span>}
            title={example.title}
            description={example.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
