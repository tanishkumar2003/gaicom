import { Link } from 'react-router-dom';

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="bg-surface/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 group-hover:border-accent/30 group-hover:shadow-lg group-hover:shadow-accent/5 group-hover:-translate-y-1 flex flex-col h-full">
        <div className="aspect-video w-full bg-surface-light overflow-hidden">
          <img
            src={post.image}
            alt={post.imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
            <time dateTime={post.dateISO}>{post.date}</time>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-gray-600" />
            <span>{post.readTime}</span>
          </div>

          <h3 className="text-xl font-semibold text-white mb-3 leading-snug group-hover:text-accent transition-colors duration-200">
            {post.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed flex-1 line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}
