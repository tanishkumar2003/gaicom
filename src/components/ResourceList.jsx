import Card from './Card';

const resourceCategories = [
  {
    category: 'Getting Started',
    resources: [
      {
        icon: '📘',
        title: 'Beginner\'s Guide to Generative AI',
        description: 'A comprehensive introduction covering key concepts, tools, and practical applications.',
        link: 'https://microsoft.github.io/generative-ai-for-beginners/#/',
      },
      {
        icon: '🎥',
        title: 'AI Fundamentals Video Series',
        description: 'Watch our curated video series explaining AI concepts in plain language.',
        link: 'https://grow.google/ai-essentials/',
      },
      {
        icon: '📋',
        title: 'AI Readiness Checklist',
        description: 'Assess your organization\'s readiness to adopt AI tools and technologies.',
        link: 'https://rtslabs.com/ai-readiness-checklist/',
      },
    ],
  },
  {
    category: 'Tools & Platforms',
    resources: [
      {
        icon: '🛠️',
        title: 'AI Tool Comparison Guide',
        description: 'Side-by-side comparison of popular generative AI tools for different use cases.',
        link: 'https://www.huit.harvard.edu/ai/tools',
      },
      {
        icon: '🤖',
        title: 'ChatBot Builder Resources',
        description: 'Step-by-step guides to building your own AI-powered chatbot.',
        link: 'https://www.liveperson.com/resources/reports/ai-chatbots/',
      },
      {
        icon: '🎨',
        title: 'AI Design Tools Directory',
        description: 'Curated list of AI-powered design and creative tools with reviews.',
        link: 'https://github.com/frangelbarrera/Artificial-Intelligence-Universe',
      },
    ],
  },
  {
    category: 'Research & Policy',
    resources: [
      {
        icon: '📄',
        title: 'AI Ethics Framework',
        description: 'Our recommended framework for responsible AI adoption in communities.',
        link: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
      },
      {
        icon: '📊',
        title: 'Community AI Impact Report',
        description: 'Annual report on how AI is impacting communities.',
        link: 'https://social.desa.un.org/sdn/ai-for-good-impact-report',
      },
    ],
  },
];

export default function ResourceList() {
  return (
    <div className="space-y-16">
      {resourceCategories.map((cat) => (
        <div key={cat.category}>
          <h3 className="text-2xl font-bold text-white mb-6">{cat.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.resources.map((resource) => (
              <Card
                key={resource.title}
                icon={<span aria-hidden="true">{resource.icon}</span>}
                title={resource.title}
                description={resource.description}
                cta="View Resource"
                ctaHref={resource.link}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
