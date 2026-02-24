import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  fields: [
    defineField({
      name: 'impactHeading',
      title: 'Impact Heading',
      type: 'string',
      initialValue: 'Your Impact Matters',
      validation: (Rule) => Rule.required().min(3).max(100),
    }),
    defineField({
      name: 'impactDescription',
      title: 'Impact Description',
      type: 'text',
      initialValue:
        'Every contribution helps us reach more communities with AI education and resources. In the past year, donations like yours have helped us:',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'impactStats',
      title: 'Impact Stats',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points showing impact (e.g. "Train 500+ educators in AI tools")',
      validation: (Rule) => Rule.min(1).error('At least one impact stat is required'),
    }),
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'text',
      description: 'A testimonial quote for the donate page',
      validation: (Rule) =>
        Rule.custom((quote, context) => {
          const author = context.document?.testimonialAuthor
          if (quote && !author) return 'Testimonial author is required when a quote is provided'
          if (!quote && author) return 'Testimonial quote is required when an author is provided'
          return true
        }),
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Testimonial Author',
      type: 'string',
      description: 'Required if a testimonial quote is provided',
      validation: (Rule) =>
        Rule.custom((author, context) => {
          const quote = context.document?.testimonialQuote
          if (author && !quote) return 'Testimonial quote is required when an author is provided'
          if (!author && quote) return 'Testimonial author is required when a quote is provided'
          return true
        }),
    }),
    defineField({
      name: 'customAmountMin',
      title: 'Custom Amount Minimum ($)',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => [
        Rule.required().error('Minimum custom amount is required'),
        Rule.integer().min(1).error('Minimum amount must be at least $1'),
      ],
    }),
    defineField({
      name: 'customAmountMax',
      title: 'Custom Amount Maximum ($)',
      type: 'number',
      initialValue: 5000,
      validation: (Rule) => [
        Rule.required().error('Maximum custom amount is required'),
        Rule.integer().min(1).error('Maximum amount must be at least $1'),
        Rule.custom((max, context) => {
          const min = context.document?.customAmountMin
          if (max != null && min != null && max <= min) {
            return `Maximum ($${max}) must be greater than minimum ($${min})`
          }
          return true
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Donate Page'}
    },
  },
})
