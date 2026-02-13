import SectionWrapper from './SectionWrapper';
import Card from './Card';

const examples = [
  {
    icon: '✍️',
    title: 'Content Creation',
    description:
      'Generate blog posts, social media content, and marketing copy faster with AI writing assistants.',
  },
  {
    icon: '🎨',
    title: 'Design & Visual Arts',
    description:
      'Create graphics, illustrations, and visual assets using AI-powered design tools.',
  },
  {
    icon: '📊',
    title: 'Data Analysis',
    description:
      'Transform raw data into actionable insights with AI-driven analytics and visualization.',
  },
  {
    icon: '🎓',
    title: 'Personalized Education',
    description:
      'Build adaptive learning experiences that meet every student where they are.',
  },
  {
    icon: '💬',
    title: 'Customer Support',
    description:
      'Deploy intelligent chatbots and support systems that improve response time and satisfaction.',
  },
  {
    icon: '🔬',
    title: 'Research & Discovery',
    description:
      'Accelerate research workflows with AI that summarizes papers, finds patterns, and generates hypotheses.',
  },
];

export default function ExamplesSection() {
  return (
    <SectionWrapper dark id="examples">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Real-World Applications
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          AI in Action
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Discover how communities and organizations are already leveraging generative AI
          to transform their work and create new possibilities.
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
