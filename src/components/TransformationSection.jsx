import SectionWrapper from './SectionWrapper';

export default function TransformationSection() {
  return (
    <SectionWrapper id="transformation">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            AI Transformation
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The World Is Changing — Are You Ready?
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Generative AI is reshaping how we work, learn, create, and communicate. From
            automating routine tasks to generating creative content, AI tools are becoming
            essential across every industry.
          </p>
          <p className="text-gray-400 leading-relaxed mb-6">
            GAICOM helps communities understand these changes, adopt AI tools responsibly,
            and build the skills needed to thrive. We provide hands-on workshops, curated
            resources, and a supportive community of practice.
          </p>
          <ul className="space-y-3">
            {[
              'Hands-on AI workshops and training',
              'Curated tools and resource libraries',
              'Community-driven support networks',
              'Responsible AI adoption guidance',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-300">
                <svg
                  className="w-5 h-5 text-accent mt-0.5 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] bg-gradient-to-br from-accent/20 via-surface to-surface-light rounded-2xl flex items-center justify-center border border-white/5">
            <div className="text-center p-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-accent/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-white font-semibold text-lg">AI-Powered Future</p>
              <p className="text-gray-400 text-sm mt-2">Interactive visual coming soon</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" aria-hidden="true" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" aria-hidden="true" />
        </div>
      </div>
    </SectionWrapper>
  );
}
