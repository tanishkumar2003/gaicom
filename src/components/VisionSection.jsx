import SectionWrapper from './SectionWrapper';
import Button from './Button';

const nodes = [
  { cx: 20, cy: 25, r: 1.8, delay: '0s' },
  { cx: 45, cy: 15, r: 1.4, delay: '0.5s' },
  { cx: 70, cy: 30, r: 2, delay: '1s' },
  { cx: 35, cy: 55, r: 1.8, delay: '1.5s' },
  { cx: 60, cy: 50, r: 1.4, delay: '0.8s' },
  { cx: 80, cy: 65, r: 1.8, delay: '1.2s' },
  { cx: 25, cy: 75, r: 1.4, delay: '0.3s' },
  { cx: 50, cy: 80, r: 2, delay: '1.8s' },
  { cx: 75, cy: 85, r: 1.4, delay: '0.6s' },
];

const connections = [
  [20, 25, 45, 15],
  [45, 15, 70, 30],
  [20, 25, 35, 55],
  [35, 55, 60, 50],
  [60, 50, 70, 30],
  [60, 50, 80, 65],
  [35, 55, 25, 75],
  [25, 75, 50, 80],
  [50, 80, 75, 85],
  [80, 65, 75, 85],
];

export default function VisionSection() {
  return (
    <SectionWrapper dark id="vision">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Our Vision
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            A Future Where AI Lifts Everyone
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            We envision a world where every person, organization, and community can harness the
            transformative power of generative AI — regardless of background, resources, or
            technical expertise. Through collaboration, education, and open access, we&apos;re building
            that future together.
          </p>
          <Button to="/about" variant="outline" size="large">
            Learn Our Story
          </Button>
        </div>

        <div className="relative" aria-hidden="true">
          <div className="aspect-square max-w-md mx-auto lg:max-w-none rounded-2xl bg-gradient-to-br from-accent/5 via-surface to-surface-light border border-white/5 overflow-hidden relative">
            {/* Radial glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-accent/10 blur-3xl vision-pulse" />
            </div>

            {/* Network SVG */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {connections.map((c, i) => (
                <line
                  key={`line-${i}`}
                  x1={c[0]}
                  y1={c[1]}
                  x2={c[2]}
                  y2={c[3]}
                  stroke="#4F8DFD"
                  strokeWidth="0.3"
                  opacity="0.2"
                  className="vision-line"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}

              {nodes.map((node, i) => (
                <circle
                  key={`node-${i}`}
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r}
                  fill="#4F8DFD"
                  className="vision-node"
                  style={{ animationDelay: node.delay }}
                />
              ))}

              <circle cx="50" cy="50" r="8" fill="#4F8DFD" opacity="0.08" />
              <circle cx="50" cy="50" r="5" fill="#4F8DFD" opacity="0.15" className="vision-pulse" />
              <circle cx="50" cy="50" r="2.5" fill="#4F8DFD" opacity="0.4" />
            </svg>

            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-accent/15 rounded-tr-xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-accent/15 rounded-bl-xl" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
