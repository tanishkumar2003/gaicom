import { useState, useEffect, useCallback } from 'react';
import SectionWrapper from './SectionWrapper';

const testimonials = [
  {
    quote:
      'GAICOM opened our eyes to what AI can do for our school district. Our teachers now feel confident integrating AI tools into their lesson plans.',
    author: 'Maria Chen',
    role: 'Superintendent',
    org: 'Livingston Public Schools',
  },
  {
    quote:
      "As a small business owner, I had no idea where to start with AI. GAICOM's workshops gave me practical tools I could use immediately to improve operations.",
    author: 'James Wright',
    role: 'Owner',
    org: 'Wright & Co. Consulting',
  },
  {
    quote:
      'The resources and community support from GAICOM have been invaluable. We were able to automate our grant writing process and focus more on our mission.',
    author: 'Aisha Patel',
    role: 'Executive Director',
    org: 'Community Impact Alliance',
  },
  {
    quote:
      'I used to think AI was only for tech companies. After attending a GAICOM workshop, I built an AI chatbot for our neighborhood association that handles event signups and FAQs. It saved us hours every week.',
    author: 'Carlos Mendez',
    role: 'Community Organizer',
    org: 'Eastside Neighborhood Council',
  },
  {
    quote:
      "GAICOM's high school program gave me the confidence to pursue computer science in college. Learning how to use AI tools before graduation put me ahead of my peers.",
    author: 'Sophia Nguyen',
    role: 'Student',
    org: 'Livingston High School',
  },
  {
    quote:
      'As a researcher, I spend less time on literature reviews and more time on original analysis thanks to the AI workflows I learned through GAICOM. It has genuinely changed how I work.',
    author: 'Dr. Robert Okafor',
    role: 'Research Scientist',
    org: 'Rutgers University',
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <SectionWrapper id="testimonials">
      <div className="text-center mb-12 md:mb-16">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          What Our Community Says
        </h2>
      </div>

      <div
        className="max-w-3xl mx-auto"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div className="relative bg-surface rounded-2xl border border-white/5 p-8 md:p-12">
          <svg
            className="absolute top-6 left-6 w-10 h-10 text-accent/20"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
          </svg>
          <blockquote className="relative z-10">
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed italic mb-6">
              &ldquo;{testimonials[active].quote}&rdquo;
            </p>
            <footer>
              <p className="text-white font-semibold">{testimonials[active].author}</p>
              <p className="text-gray-400 text-sm">
                {testimonials[active].role}, {testimonials[active].org}
              </p>
            </footer>
          </blockquote>
        </div>

        <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? 'bg-accent w-8' : 'bg-surface-lighter hover:bg-gray-500'
              }`}
              role="tab"
              aria-selected={i === active}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
