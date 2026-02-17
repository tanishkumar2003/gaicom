import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'mission', title: 'Mission Section'},
    {name: 'vision', title: 'Vision Section'},
    {name: 'examples', title: 'Examples Section'},
    {name: 'testimonials', title: 'Testimonials Section'},
    {name: 'cta', title: 'CTA Section'},
    {name: 'newsletter', title: 'Newsletter Section'},
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      initialValue: 'Empowering Communities Through AI',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      initialValue:
        'GAICOM bridges the gap between cutting-edge generative AI and the communities that stand to benefit the most. We provide education, resources, and hands-on support to make AI accessible for everyone.',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Sign Up for Newsletter',
    }),
    // Mission
    defineField({
      name: 'missionHeading',
      title: 'Mission Heading',
      type: 'string',
      group: 'mission',
      initialValue: 'AI for Every Community',
    }),
    defineField({
      name: 'missionSubheading',
      title: 'Mission Subheading',
      type: 'text',
      group: 'mission',
      initialValue:
        'We believe generative AI should be accessible, understandable, and beneficial for all. GAICOM provides the education, tools, and support communities need to thrive in an AI-driven world.',
    }),
    defineField({
      name: 'missionAudiences',
      title: 'Mission Audiences',
      type: 'array',
      group: 'mission',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({name: 'icon', title: 'Icon Name', type: 'string', description: 'Icon identifier: community, professional, student, business'}),
            defineField({name: 'order', title: 'Order', type: 'number'}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'description'},
          },
        },
      ],
    }),
    // Vision
    defineField({
      name: 'visionHeading',
      title: 'Vision Heading',
      type: 'string',
      group: 'vision',
      initialValue: 'A Future Where AI Lifts Everyone',
    }),
    // Examples
    defineField({
      name: 'examplesHeading',
      title: 'Examples Heading',
      type: 'string',
      group: 'examples',
      initialValue: 'AI in Action',
    }),
    defineField({
      name: 'examplesSubheading',
      title: 'Examples Subheading',
      type: 'text',
      group: 'examples',
      initialValue:
        'Discover how communities and organizations are already leveraging generative AI to transform their work and create new possibilities.',
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      group: 'examples',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'icon', title: 'Icon (Emoji)', type: 'string'}),
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
            defineField({name: 'order', title: 'Order', type: 'number'}),
          ],
          preview: {
            select: {title: 'title', icon: 'icon'},
            prepare({title, icon}) {
              return {title: `${icon || ''} ${title || 'Untitled'}`}
            },
          },
        },
      ],
    }),
    // Testimonials
    defineField({
      name: 'testimonialsHeading',
      title: 'Testimonials Heading',
      type: 'string',
      group: 'testimonials',
      initialValue: 'What Our Community Says',
    }),
    defineField({
      name: 'testimonialsSubheading',
      title: 'Testimonials Subheading',
      type: 'text',
      group: 'testimonials',
    }),
    // CTA
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Ready to Shape the Future with AI?',
    }),
    defineField({
      name: 'ctaSubheading',
      title: 'CTA Subheading',
      type: 'text',
      group: 'cta',
      initialValue:
        'Join GAICOM and help build a community where everyone benefits from the power of generative AI. Your support makes a difference.',
    }),
    // Newsletter
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Stay in the Loop',
    }),
    defineField({
      name: 'newsletterSubheading',
      title: 'Newsletter Subheading',
      type: 'text',
      group: 'newsletter',
      initialValue:
        'Subscribe to our newsletter and never miss an update on workshops, resources, and community events.',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
