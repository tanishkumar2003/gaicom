import Button from './Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-black"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(79,141,253,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(79,141,253,0.1) 0%, transparent 40%)',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
        <p className="text-accent text-sm md:text-base font-semibold tracking-widest uppercase mb-4">
          Generative AI Community
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Empowering Communities{' '}
          <span className="text-accent">Through AI</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          GAICOM bridges the gap between cutting-edge generative AI and the communities
          that stand to benefit the most. We provide education, resources, and hands-on
          support to make AI accessible for everyone.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/events" size="large" className="w-full sm:w-auto">
            Sign Up for Newsletter
          </Button>
          <Button to="/about" variant="outline" size="large" className="w-full sm:w-auto">
            Get Involved
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
        <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
