import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'donatePage',
  title: 'Donate Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'impactHeading',
      title: 'Impact Heading',
      type: 'string',
      initialValue: 'Your Impact Matters',
    }),
    defineField({
      name: 'impactDescription',
      title: 'Impact Description',
      type: 'text',
      initialValue:
        'Every contribution helps us reach more communities with AI education and resources. In the past year, donations like yours have helped us:',
    }),
    defineField({
      name: 'impactStats',
      title: 'Impact Stats',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Bullet points showing impact (e.g. "Train 500+ educators in AI tools")',
    }),
    defineField({
      name: 'testimonialQuote',
      title: 'Testimonial Quote',
      type: 'text',
    }),
    defineField({
      name: 'testimonialAuthor',
      title: 'Testimonial Author',
      type: 'string',
    }),
    defineField({
      name: 'customAmountMin',
      title: 'Custom Amount Minimum ($)',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'customAmountMax',
      title: 'Custom Amount Maximum ($)',
      type: 'number',
      initialValue: 5000,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Donate Page'}
    },
  },
})
