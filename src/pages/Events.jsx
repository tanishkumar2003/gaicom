import { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import EventList from '../components/EventList';

export default function Events() {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Community Events
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Workshops & Events
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Join us for hands-on workshops, webinars, and community gatherings
            designed to help you learn and apply generative AI.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="flex justify-center mb-10" role="tablist" aria-label="Event filters">
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold capitalize transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-400 hover:text-white border-b-2 border-transparent'
              }`}
            >
              {tab} Events
            </button>
          ))}
        </div>
        <div role="tabpanel" aria-label={`${activeTab} events`}>
          <EventList filter={activeTab} />
        </div>
      </SectionWrapper>
    </>
  );
}
