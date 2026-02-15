import { useParams, Link } from 'react-router-dom';
import { getBlogBySlug } from '../data/blogData';
import GaicomLogo from '../components/GaicomLogo';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-light" aria-hidden="true" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(79,141,253,0.3) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-accent transition-colors duration-200 text-sm mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-6">
            <GaicomLogo size={36} className="text-accent mb-4" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="font-medium text-white">{post.author}</span>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gray-600" />
            <time dateTime={post.dateISO}>{post.date}</time>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{post.readTime}</span>
            {post.updated && (
              <>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gray-600" />
                <span className="text-gray-500">Updated {post.updated}</span>
              </>
            )}
          </div>
        </div>
      </section>

      <div className="w-16 h-1 bg-accent rounded-full mx-auto -mt-2 mb-12" aria-hidden="true" />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          {post.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </>
  );
}
