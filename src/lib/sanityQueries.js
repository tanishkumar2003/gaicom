// Site Settings
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  "logoUrl": logo.asset->url,
  contactEmail,
  location,
  socialLinks
}`;

// Home Page
export const HOME_PAGE_QUERY = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroCtaText,
  missionHeading,
  missionSubheading,
  "missionAudiences": missionAudiences[] | order(order asc),
  visionHeading,
  examplesHeading,
  examplesSubheading,
  "examples": examples[] | order(order asc),
  testimonialsHeading,
  testimonialsSubheading,
  ctaHeading,
  ctaSubheading,
  newsletterHeading,
  newsletterSubheading
}`;

// Hero Slides
export const HERO_SLIDES_QUERY = `*[_type == "heroSlide" && isActive == true] | order(order asc){
  _id,
  title,
  "imageUrl": image.asset->url,
  alt,
  order
}`;

// Testimonials
export const TESTIMONIALS_QUERY = `*[_type == "testimonial" && isActive == true] | order(order asc){
  _id,
  quote,
  author,
  role,
  organization,
  order
}`;

// Team Members
export const TEAM_MEMBERS_QUERY = `*[_type == "teamMember" && isActive == true] | order(order asc){
  _id,
  name,
  initials,
  "imageUrl": image.asset->url,
  bio,
  socialLinks,
  order
}`;

// Events - Upcoming
export const UPCOMING_EVENTS_QUERY = `*[_type == "event" && startDateTime > now()] | order(startDateTime asc){
  _id,
  title,
  dateDisplay,
  startDateTime,
  description,
  location,
  "imageUrl": image.asset->url,
  registrationLink
}`;

// Events - Past
export const PAST_EVENTS_QUERY = `*[_type == "event" && startDateTime < now()] | order(startDateTime desc){
  _id,
  title,
  dateDisplay,
  startDateTime,
  description,
  location,
  "imageUrl": image.asset->url,
  recapLink
}`;

// Resources
export const RESOURCES_QUERY = `*[_type == "resource" && isActive == true] | order(category asc, order asc){
  _id,
  title,
  icon,
  description,
  category,
  link,
  "fileUrl": file.asset->url,
  tags,
  order
}`;

// Blog Posts (index list)
export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "mainImageUrl": mainImage.asset->url,
  imageAlt,
  "authorName": author->name,
  publishedAt,
  readTime,
  categories,
  tags
}`;

// Single Blog Post
export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  body,
  "mainImageUrl": mainImage.asset->url,
  imageAlt,
  "authorName": author->name,
  "authorImage": author->image.asset->url,
  "authorBio": author->bio,
  publishedAt,
  updatedAt,
  readTime,
  categories,
  tags,
  seoTitle,
  seoDescription
}`;

// About Page
export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage"][0]{
  heroHeading,
  heroSubheading,
  storyHeading,
  storyParagraphs,
  valuesHeading,
  valuesSubheading,
  values
}`;

// Donation Tiers
export const DONATION_TIERS_QUERY = `*[_type == "donationTier" && isActive == true] | order(order asc){
  _id,
  label,
  amount,
  description,
  featured,
  order
}`;

// Donate Page
export const DONATE_PAGE_QUERY = `*[_type == "donatePage"][0]{
  impactHeading,
  impactDescription,
  impactStats,
  testimonialQuote,
  testimonialAuthor,
  customAmountMin,
  customAmountMax
}`;
