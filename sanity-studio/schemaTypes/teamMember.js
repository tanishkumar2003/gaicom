import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'initials',
      title: 'Initials',
      type: 'string',
      description: 'e.g. "JS" for John Smith. Used as image fallback',
      validation: (Rule) => [
        Rule.required().error('Initials are required'),
        Rule.min(1).max(3).error('Initials must be 1-3 characters'),
        Rule.uppercase().error('Initials must be uppercase'),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Professional headshot photo',
      validation: (Rule) => Rule.required().error('A photo is required for every team member'),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      description: 'Short biography (10-500 characters)',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Optional social media and web links',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              validation: (Rule) => Rule.required().error('Platform is required for each social link'),
              options: {
                list: [
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Twitter', value: 'twitter'},
                  {title: 'GitHub', value: 'github'},
                  {title: 'Website', value: 'website'},
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required().error('URL is required for each social link'),
            }),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display position. Must be a unique positive integer if provided',
      validation: (Rule) => [
        Rule.integer().positive().error('Order must be a positive integer'),
        Rule.custom(async (order, context) => {
          if (order == null) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "teamMember" && order == $order && !(_id in [$draftId, $publishedId])])`,
            {order, draftId: `drafts.${id}`, publishedId: id},
          )
          if (count > 0) return `Another team member already uses order ${order}`
          return true
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active team members are displayed on the site',
      initialValue: true,
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
      title: 'name',
      media: 'image',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({title, media, order, isActive}) {
      const status = isActive === false ? ' [INACTIVE]' : ''
      return {
        title: `${order ?? '?'}. ${title}${status}`,
        media,
      }
    },
  },
})
