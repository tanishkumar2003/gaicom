import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-accent text-white hover:bg-accent-dark focus-visible:ring-accent',
  secondary:
    'bg-surface-light text-white hover:bg-surface-lighter focus-visible:ring-surface-lighter',
  outline:
    'border-2 border-accent text-accent hover:bg-accent hover:text-white focus-visible:ring-accent',
  text: 'text-accent hover:text-accent-light underline-offset-4 hover:underline focus-visible:ring-accent',
};

const sizes = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  to,
  className = '',
  fullWidth = false,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const classes = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
