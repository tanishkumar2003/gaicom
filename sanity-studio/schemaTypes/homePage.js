import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
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
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      initialValue:
        'GAICOM bridges the gap between cutting-edge generative AI and the communities that stand to benefit the most. We provide education, resources, and hands-on support to make AI accessible for everyone.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Button Text',
      type: 'string',
      group: 'hero',
      initialValue: 'Sign Up for Newsletter',
      validation: (Rule) => Rule.required().min(2).max(40),
    }),
    // Mission
    defineField({
      name: 'missionHeading',
      title: 'Mission Heading',
      type: 'string',
      group: 'mission',
      initialValue: 'AI for Every Community',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'missionSubheading',
      title: 'Mission Subheading',
      type: 'text',
      group: 'mission',
      initialValue:
        'We believe generative AI should be accessible, understandable, and beneficial for all. GAICOM provides the education, tools, and support communities need to thrive in an AI-driven world.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'missionAudiences',
      title: 'Mission Audiences',
      type: 'array',
      group: 'mission',
      description: 'Target audiences for the mission section',
      validation: (Rule) => Rule.max(6),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(50),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required().min(10).max(300),
            }),
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon identifier: community, professional, student, business',
              options: {
                list: [
                  {title: 'Community', value: 'community'},
                  {title: 'Professional', value: 'professional'},
                  {title: 'Student', value: 'student'},
                  {title: 'Business', value: 'business'},
                ],
              },
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.integer().positive(),
            }),
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
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    // Examples
    defineField({
      name: 'examplesHeading',
      title: 'Examples Heading',
      type: 'string',
      group: 'examples',
      initialValue: 'AI in Action',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'examplesSubheading',
      title: 'Examples Subheading',
      type: 'text',
      group: 'examples',
      initialValue:
        'Discover how communities and organizations are already leveraging generative AI to transform their work and create new possibilities.',
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      type: 'array',
      group: 'examples',
      description: 'Examples of AI in action',
      validation: (Rule) => Rule.max(8),
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (Emoji)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(80),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required().min(10).max(300),
            }),
            defineField({
              name: 'order',
              title: 'Order',
              type: 'number',
              validation: (Rule) => Rule.integer().positive(),
            }),
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
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'testimonialsSubheading',
      title: 'Testimonials Subheading',
      type: 'text',
      group: 'testimonials',
      validation: (Rule) => Rule.max(300),
    }),
    // CTA
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      group: 'cta',
      initialValue: 'Ready to Shape the Future with AI?',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'ctaSubheading',
      title: 'CTA Subheading',
      type: 'text',
      group: 'cta',
      initialValue:
        'Join GAICOM and help build a community where everyone benefits from the power of generative AI. Your support makes a difference.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    // Newsletter
    defineField({
      name: 'newsletterHeading',
      title: 'Newsletter Heading',
      type: 'string',
      group: 'newsletter',
      initialValue: 'Stay in the Loop',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'newsletterSubheading',
      title: 'Newsletter Subheading',
      type: 'text',
      group: 'newsletter',
      initialValue:
        'Subscribe to our newsletter and never miss an update on workshops, resources, and community events.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
