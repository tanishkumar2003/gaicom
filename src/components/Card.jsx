import { Link } from 'react-router-dom';

export default function Card({
  children,
  className = '',
  image,
  imageAlt = '',
  icon,
  title,
  description,
  cta,
  ctaTo,
  ctaHref,
  hoverable = true,
}) {
  const wrapperClasses = [
    'bg-surface rounded-2xl overflow-hidden border border-white/5 transition-all duration-300',
    hoverable ? 'hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      {image && (
        <div className="aspect-video w-full bg-surface-light overflow-hidden">
          <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4 text-2xl">
            {icon}
          </div>
        )}
        {title && <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>}
        {description && <p className="text-gray-400 text-base leading-relaxed mb-4">{description}</p>}
        {children}
        {cta && ctaTo && (
          <Link
            to={ctaTo}
            className="inline-flex items-center text-accent hover:text-accent-light text-sm font-medium transition-colors duration-200 group"
          >
            {cta}
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
        {cta && ctaHref && (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-accent hover:text-accent-light text-sm font-medium transition-colors duration-200 group"
          >
            {cta}
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
