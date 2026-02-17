import { urlFor } from './sanityClient';

export const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-gray-300 text-lg leading-relaxed mb-6">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl md:text-3xl font-bold text-white mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl md:text-2xl font-bold text-white mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg md:text-xl font-semibold text-white mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-accent/60 pl-6 py-2 my-6 italic text-gray-300 text-lg">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="bg-surface-light text-accent px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = value?.blank ? '_blank' : undefined;
      const rel = value?.blank ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-accent hover:text-accent-light underline transition-colors duration-200"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(800).auto('format').url()}
            alt={value.alt || ''}
            className="rounded-lg w-full"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="text-gray-500 text-sm text-center mt-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};
