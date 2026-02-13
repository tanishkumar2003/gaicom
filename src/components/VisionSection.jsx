import SectionWrapper from './SectionWrapper';
import Button from './Button';

export default function VisionSection() {
  return (
    <SectionWrapper dark id="vision">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
          Our Vision
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          A Future Where AI Lifts Everyone
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          We envision a world where every person, organization, and community can harness the
          transformative power of generative AI — regardless of background, resources, or
          technical expertise. Through collaboration, education, and open access, we're building
          that future together.
        </p>
        <Button to="/about" variant="outline" size="large">
          Learn Our Story
        </Button>
      </div>
    </SectionWrapper>
  );
}
