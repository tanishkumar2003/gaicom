import SectionWrapper from './SectionWrapper';
import Card from './Card';

const audiences = [
  {
    icon: '🏫',
    title: 'Educators',
    description:
      'Access AI-powered teaching tools and curricula designed to transform classrooms and empower the next generation.',
  },
  {
    icon: '🏢',
    title: 'Small Businesses',
    description:
      'Discover practical AI solutions that streamline operations, reduce costs, and unlock new growth opportunities.',
  },
  {
    icon: '🏛️',
    title: 'Nonprofits',
    description:
      'Leverage generative AI to amplify your impact, automate outreach, and better serve your community.',
  },
  {
    icon: '👤',
    title: 'Individuals',
    description:
      'Build AI literacy and skills that open doors to new career paths and creative possibilities.',
  },
];

export default function MissionSection() {
  return (
    <SectionWrapper id="mission">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Our Mission
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          AI for Every Community
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          We believe generative AI should be accessible, understandable, and beneficial for all.
          GAICOM provides the education, tools, and support communities need to thrive in an
          AI-driven world.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {audiences.map((item) => (
          <Card
            key={item.title}
            icon={<span aria-hidden="true">{item.icon}</span>}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
