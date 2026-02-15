export const blogPosts = [
  {
    id: 1,
    slug: 'gaicom-launches-first-two-sessions',
    title: 'Gaicom launches its first two sessions, panels included!',
    author: 'Komal Misra',
    date: 'May 4, 2025',
    dateISO: '2025-05-04',
    updated: 'Jul 13, 2025',
    readTime: '2 min read',
    image: '/blog/gaicom-launch.svg',
    imageAlt: 'GAICOM community session at Livingston Community Center',
    excerpt:
      'GAICOM hosted two sessions at the Livingston Community Center covering generative AI foundations and the rise of AI agents, complete with lively panels.',
    content: [
      'GAICOM addresses the growing AI learning gap by fostering collective learning. Its mission is to simplify AI concepts, spark meaningful conversations, and help the community thrive in an AI-driven world. GAICOM hosted two sessions at the Livingston Community Center: The Transformation Begins, foundations of Gen AI, and Unleashing AI Agents: The Next Wave of Automation. Both sessions had lively panels with interesting questions posed by the audience.',
      'The first session gave the audience a foundational understanding of generative AI concepts. The session highlighted how entrepreneurs, business leaders, and AI experts view AI\'s impact \u2014 from job disruption to new opportunities \u2014 illustrating the urgency of staying informed. Participants explored everyday AI applications like self-driving cars, smart assistants, healthcare diagnostics, and AI in e-commerce and finance. The rapid rise of large language models (LLMs) was compared to past tech revolutions, showing how quickly industries are adopting AI-driven tools. AI = Data + Algorithms \u2192 Applications. Attendees learned about ML, deep learning, and generative AI, alongside discussions on AI\'s societal role, including ethics and governance. The limitations of AI like Amazon\'s AI hiring bias, Google\'s Photo Labeling Controversy, and self driving car fatalities, were also discussed. The panel of 6 technology professionals and business owners discussed how they viewed the future of AI and how they have implemented AI in their businesses. All panelists agreed on one thing \u2014 AI is real and not a hype. They debated how Gen AI will impact the working population. One of the panelists claimed that 1 billion jobs would be lost due to AI. Bill Gates echoed the same in the week following the first session.',
      'The second session explored the rising power of AI agents \u2014 autonomous systems designed to perform tasks, make decisions, and enhance productivity across industries. Like having your own digital assistant, AI agents are becoming a reality, helping individuals and businesses automate routine work, boost creativity, and streamline operations. The audience learned what an autonomous agent is. AI agents go beyond traditional tools by proactively executing tasks, learning from interactions, and adapting to user needs. Tools like ChatGPT-based conversational assistants, AutoGPT, and enterprise-level agents are already transforming how we work, communicate, and solve problems. No matter your role \u2014 student, professional, educator, or entrepreneur \u2014 AI agents can simplify tasks, save time, and empower you to focus on high-impact activities. Bottom line is: AI agents are here \u2014 and they\'re redefining what\'s possible. This session showed how embracing them now can help secure your future in a rapidly changing world.',
      'Stay tuned for GAICOM\'s next session!',
    ],
  },
];

export function getBlogBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null;
}
