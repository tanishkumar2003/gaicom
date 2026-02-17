import { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import EventCard from '../components/EventCard';
import GaicomLogo from '../components/GaicomLogo';
import { client } from '../lib/sanityClient';
import { UPCOMING_EVENTS_QUERY, PAST_EVENTS_QUERY } from '../lib/sanityQueries';

const FALLBACK_PAST_EVENTS = [
  {
    date: 'March 24',
    title: 'The Transformation Begins: Generative AI Foundations',
    description:
      'Learn the fundamentals of generative AI, how it works, and its growing role in everyday life. We break it down in simple terms and offer actionable tips for students, professionals, and small business owners alike.',
  },
  {
    date: 'April 7',
    title: 'Unleashing AI Agents: The Next Wave of Automation',
    description:
      'From science fiction to your desktop \u2014 explore how AI agents are becoming digital coworkers, handling repetitive tasks, answering questions, and transforming productivity.',
  },
  {
    date: 'April 28',
    title: 'The Future of Learning: AI in Education',
    description:
      'Personalized, on-demand education is no longer a dream. Discover how generative AI is creating new pathways for lifelong learning, career prep, and employee training.',
  },
  {
    date: 'June 8',
    title: 'Jobs Reimagined: How AI is Changing Careers',
    description:
      'The workplace is evolving rapidly. Learn how AI is reshaping job roles, skills in demand, and what it takes to stay relevant in the age of generative AI.',
  },
  {
    date: 'June 15',
    title: 'Driving Growth and Innovation: AI for Local Businesses',
    description:
      'AI isn\u2019t just for tech giants. See how small businesses can use AI to automate tasks, improve customer experience, and gain a competitive edge.',
  },
  {
    date: 'June 22',
    title: 'Building Trust: AI Governance and Ethics',
    description:
      'As AI becomes more powerful, ethical and responsible use becomes critical. Learn about fairness, transparency, and how we can build trust in AI through governance frameworks.',
  },
];

const tabs = [
  { key: 'upcoming', label: 'Upcoming Events' },
  { key: 'past', label: 'Past Events' },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState('past');
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState(FALLBACK_PAST_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const [upcoming, past] = await Promise.all([
          client.fetch(UPCOMING_EVENTS_QUERY),
          client.fetch(PAST_EVENTS_QUERY),
        ]);
        if (upcoming) {
          setUpcomingEvents(
            upcoming.map((e) => ({
              date: e.dateDisplay || '',
              title: e.title,
              description: e.description,
              image: e.imageUrl || '',
              registrationLink: e.registrationLink || '',
            }))
          );
          if (upcoming.length > 0) setActiveTab('upcoming');
        }
        if (past && past.length > 0) {
          setPastEvents(
            past.map((e) => ({
              date: e.dateDisplay || '',
              title: e.title,
              description: e.description,
              image: e.imageUrl || '',
              recapLink: e.recapLink || '',
            }))
          );
        }
      } catch (err) {
        console.error('Failed to fetch events from Sanity:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const events = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-light" aria-hidden="true" />

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,141,253,0.35) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <pattern id="events-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="currentColor" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="currentColor" strokeWidth="0.3" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#events-grid)" />
        </svg>

        <div className="relative z-10 max-w-4xl mx-auto text-center about-fade-in">
          <GaicomLogo size={48} className="text-accent mx-auto mb-5" />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
            Community Events
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Workshops & Events
          </h1>
          <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-8" aria-hidden="true" />
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join us for hands-on workshops, webinars, and community gatherings
            designed to help you learn and apply generative AI.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="flex justify-center mb-10 relative" role="tablist" aria-label="Event filters">
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-3 text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'text-accent'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div role="tabpanel" aria-label={`${activeTab} events`}>
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {events.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
