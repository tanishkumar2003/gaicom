import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal Reference)',
      type: 'string',
      description: 'Internal label to identify this slide in the studio',
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Hero banner image. Use high-resolution landscape images (recommended 1920x800+)',
      validation: (Rule) => Rule.required().error('Every hero slide must have an image'),
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessible description of the image for screen readers and SEO',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(200)
          .error('Alt text is required for accessibility (5-200 characters)'),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display position (1-4). Must be unique among active slides',
      validation: (Rule) => [
        Rule.required().error('Order is required'),
        Rule.integer().positive().error('Order must be a positive integer'),
        Rule.max(4).error('Order cannot exceed 4 (maximum 4 slides)'),
        Rule.custom(async (order, context) => {
          if (order == null) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "heroSlide" && order == $order && !(_id in [$draftId, $publishedId])])`,
            {order, draftId: `drafts.${id}`, publishedId: id},
          )
          if (count > 0) return `Another hero slide already uses order ${order}`
          return true
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active slides are displayed. Maximum 4 active slides allowed',
      initialValue: true,
      validation: (Rule) =>
        Rule.custom(async (isActive, context) => {
          if (!isActive) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "heroSlide" && isActive == true && !(_id in [$draftId, $publishedId])])`,
            {draftId: `drafts.${id}`, publishedId: id},
          )
          if (count >= 4)
            return 'Maximum 4 active hero slides allowed. Deactivate another slide first'
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
      title: 'title',
      order: 'order',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({title, order, media, isActive}) {
      const status = isActive === false ? ' [INACTIVE]' : ''
      return {
        title: `${order ?? '?'}. ${title || 'Untitled'}${status}`,
        media,
      }
    },
  },
})
