import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'The testimonial text (10-500 characters)',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Full name of the person giving the testimonial',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Optional. Job title or role of the author',
      validation: (Rule) =>
        Rule.custom((role) => {
          if (role && role.trim().length < 2) return 'Role must be at least 2 characters if provided'
          return true
        }),
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      description: 'Optional. Organization or company name',
      validation: (Rule) =>
        Rule.custom((org) => {
          if (org && org.trim().length < 2)
            return 'Organization must be at least 2 characters if provided'
          return true
        }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display position. Must be a unique positive integer',
      validation: (Rule) => [
        Rule.required().error('Order is required'),
        Rule.integer().positive().error('Order must be a positive integer'),
        Rule.custom(async (order, context) => {
          if (order == null) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "testimonial" && order == $order && !(_id in [$draftId, $publishedId])])`,
            {order, draftId: `drafts.${id}`, publishedId: id},
          )
          if (count > 0) return `Another testimonial already uses order ${order}`
          return true
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active testimonials are displayed. Maximum 10 active allowed',
      initialValue: true,
      validation: (Rule) =>
        Rule.custom(async (isActive, context) => {
          if (!isActive) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "testimonial" && isActive == true && !(_id in [$draftId, $publishedId])])`,
            {draftId: `drafts.${id}`, publishedId: id},
          )
          if (count >= 10)
            return 'Maximum 10 active testimonials allowed. Deactivate another first'
          return true
        }),
    }),
  ],
  orderings: [
    {
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'organization',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({title, subtitle, order, isActive}) {
      const status = isActive === false ? ' [INACTIVE]' : ''
      return {
        title: `${order ?? '?'}. ${title}${status}`,
        subtitle,
      }
    },
  },
})
