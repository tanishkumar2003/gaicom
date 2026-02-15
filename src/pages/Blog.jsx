import SectionWrapper from '../components/SectionWrapper';
import BlogCard from '../components/BlogCard';
import GaicomLogo from '../components/GaicomLogo';
import { blogPosts } from '../data/blogData';

export default function Blog() {
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark to-navy" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <GaicomLogo size={44} className="text-accent mx-auto mb-4" />
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
            Insights & Updates
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Blog
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stories, guides, and insights on how generative AI is transforming
            communities, education, and the future of work.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {blogPosts.length === 0 && (
            <p className="text-center text-gray-400 py-12">
              No posts yet. Check back soon.
            </p>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
