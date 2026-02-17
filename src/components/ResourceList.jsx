import { useState, useEffect } from 'react';
import Card from './Card';
import { client } from '../lib/sanityClient';
import { RESOURCES_QUERY } from '../lib/sanityQueries';

const FALLBACK_RESOURCES = [
  {
    category: 'Getting Started',
    resources: [
      {
        icon: '\uD83D\uDCD8',
        title: "Beginner's Guide to Generative AI",
        description: 'A comprehensive introduction covering key concepts, tools, and practical applications.',
        link: 'https://microsoft.github.io/generative-ai-for-beginners/#/',
      },
      {
        icon: '\uD83C\uDFA5',
        title: 'AI Fundamentals Video Series',
        description: 'Watch our curated video series explaining AI concepts in plain language.',
        link: 'https://grow.google/ai-essentials/',
      },
      {
        icon: '\uD83D\uDCCB',
        title: 'AI Readiness Checklist',
        description: "Assess your organization's readiness to adopt AI tools and technologies.",
        link: 'https://rtslabs.com/ai-readiness-checklist/',
      },
    ],
  },
  {
    category: 'Tools & Platforms',
    resources: [
      {
        icon: '\uD83D\uDEE0\uFE0F',
        title: 'AI Tool Comparison Guide',
        description: 'Side-by-side comparison of popular generative AI tools for different use cases.',
        link: 'https://www.huit.harvard.edu/ai/tools',
      },
      {
        icon: '\uD83E\uDD16',
        title: 'ChatBot Builder Resources',
        description: 'Step-by-step guides to building your own AI-powered chatbot.',
        link: 'https://www.liveperson.com/resources/reports/ai-chatbots/',
      },
      {
        icon: '\uD83C\uDFA8',
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
        icon: '\uD83D\uDCC4',
        title: 'AI Ethics Framework',
        description: 'Our recommended framework for responsible AI adoption in communities.',
        link: 'https://www.unesco.org/en/artificial-intelligence/recommendation-ethics',
      },
      {
        icon: '\uD83D\uDCCA',
        title: 'Community AI Impact Report',
        description: 'Annual report on how AI is impacting communities.',
        link: 'https://social.desa.un.org/sdn/ai-for-good-impact-report',
      },
    ],
  },
];

export default function ResourceList() {
  const [resourceCategories, setResourceCategories] = useState(FALLBACK_RESOURCES);

  useEffect(() => {
    async function fetchResources() {
      try {
        const data = await client.fetch(RESOURCES_QUERY);
        if (data && data.length > 0) {
          // Group by category
          const grouped = {};
          data.forEach((r) => {
            const cat = r.category || 'Uncategorized';
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({
              icon: r.icon || '',
              title: r.title,
              description: r.description,
              link: r.link || r.fileUrl || '#',
            });
          });
          const categories = Object.keys(grouped).map((category) => ({
            category,
            resources: grouped[category],
          }));
          setResourceCategories(categories);
        }
      } catch (err) {
        console.error('Failed to fetch resources from Sanity:', err);
      }
    }
    fetchResources();
  }, []);

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
