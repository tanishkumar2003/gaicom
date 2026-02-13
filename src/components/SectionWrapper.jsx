export default function SectionWrapper({
  children,
  className = '',
  id,
  dark = false,
}) {
  return (
    <section
      id={id}
      className={`py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${
        dark ? 'bg-navy-dark' : ''
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
