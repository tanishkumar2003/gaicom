import Card from './Card';

const events = [
  {
    date: 'Mar 15, 2026',
    title: 'AI for Educators Workshop',
    location: 'Livingston Community Center, NJ',
    description:
      'Hands-on session exploring how teachers can integrate generative AI into classroom instruction.',
    upcoming: true,
  },
  {
    date: 'Apr 5, 2026',
    title: 'Small Business AI Summit',
    location: 'Virtual Event',
    description:
      'Learn how small businesses are using AI tools to automate operations and boost productivity.',
    upcoming: true,
  },
  {
    date: 'May 20, 2026',
    title: 'Community AI Hackathon',
    location: 'Newark Innovation Hub, NJ',
    description:
      'A weekend hackathon where teams build AI solutions for local community challenges.',
    upcoming: true,
  },
  {
    date: 'Jan 10, 2026',
    title: 'Introduction to Generative AI',
    location: 'Virtual Event',
    description:
      'An introductory webinar covering the basics of generative AI and its applications.',
    upcoming: false,
  },
  {
    date: 'Dec 1, 2025',
    title: 'AI Ethics Roundtable',
    location: 'Livingston Library, NJ',
    description:
      'A panel discussion on the ethical considerations of deploying AI in community settings.',
    upcoming: false,
  },
];

export default function EventList({ filter = 'upcoming' }) {
  const filtered = events.filter((e) =>
    filter === 'upcoming' ? e.upcoming : !e.upcoming
  );

  if (filtered.length === 0) {
    return (
      <p className="text-gray-400 text-center py-12">
        No {filter} events at the moment. Check back soon!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((event) => (
        <Card key={event.title} hoverable>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-accent text-sm font-semibold">{event.date}</span>
            {event.upcoming && (
              <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
                Upcoming
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
          <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">{event.description}</p>
          {event.upcoming && (
            <button className="text-accent hover:text-accent-light text-sm font-medium transition-colors duration-200 cursor-pointer">
              Register →
            </button>
          )}
        </Card>
      ))}
    </div>
  );
}
