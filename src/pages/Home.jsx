import HeroCarousel from '../components/HeroCarousel';
import MissionSection from '../components/MissionSection';
import VisionSection from '../components/VisionSection';
import ExamplesSection from '../components/ExamplesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CTASection from '../components/CTASection';
import SectionWrapper from '../components/SectionWrapper';
import NewsletterSignup from '../components/NewsletterSignup';

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <MissionSection />
      <VisionSection />
      <ExamplesSection />
      <TestimonialsSection />
      <CTASection />
      <SectionWrapper dark id="newsletter">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Subscribe to our newsletter and never miss an update on workshops,
            resources, and community events.
          </p>
          <NewsletterSignup />
        </div>
      </SectionWrapper>
    </>
  );
}
