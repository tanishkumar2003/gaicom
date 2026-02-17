import { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import BlogCard from '../components/BlogCard';
import GaicomLogo from '../components/GaicomLogo';
import { blogPosts as fallbackPosts } from '../data/blogData';
import { client } from '../lib/sanityClient';
import { BLOG_POSTS_QUERY } from '../lib/sanityQueries';

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await client.fetch(BLOG_POSTS_QUERY);
        if (data && data.length > 0) {
          setPosts(
            data.map((p) => ({
              id: p._id,
              slug: p.slug,
              title: p.title,
              author: p.authorName || 'GAICOM',
              date: new Date(p.publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              dateISO: p.publishedAt,
              readTime: p.readTime || '',
              image: p.mainImageUrl || '',
              imageAlt: p.imageAlt || p.title,
              excerpt: p.excerpt || '',
            }))
          );
        }
      } catch (err) {
        console.error('Failed to fetch blog posts from Sanity:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

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
          {loading ? (
            <p className="text-center text-gray-400 py-12">Loading posts...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id || post.slug} post={post} />
                ))}
              </div>

              {posts.length === 0 && (
                <p className="text-center text-gray-400 py-12">
                  No posts yet. Check back soon.
                </p>
              )}
            </>
          )}
        </div>
      </SectionWrapper>
    </>
  );
}
