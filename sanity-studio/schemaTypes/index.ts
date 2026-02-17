import siteSettings from './siteSettings'
import homePage from './homePage'
import aboutPage from './aboutPage'
import donatePage from './donatePage'
import heroSlide from './heroSlide'
import testimonial from './testimonial'
import teamMember from './teamMember'
import event from './event'
import resource from './resource'
import author from './author'
import blogPost from './blogPost'
import donationTier from './donationTier'

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  aboutPage,
  donatePage,
  // Collections
  heroSlide,
  testimonial,
  teamMember,
  event,
  resource,
  // Blog
  blogPost,
  author,
  // Donate
  donationTier,
]
