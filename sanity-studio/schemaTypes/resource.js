import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(150),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'An emoji icon for this resource (e.g. "📚"). Either emoji or icon image is required',
      validation: (Rule) =>
        Rule.custom((icon, context) => {
          const iconImage = context.document?.iconImage
          if (!icon && !iconImage?.asset) {
            return 'Either an emoji icon or an icon image is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'iconImage',
      title: 'Icon Image',
      type: 'image',
      description: 'Upload a custom icon image. Used instead of emoji if provided',
      options: {hotspot: false},
      validation: (Rule) =>
        Rule.custom((iconImage, context) => {
          const icon = context.document?.icon
          if (!icon && !iconImage?.asset) {
            return 'Either an emoji icon or an icon image is required'
          }
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (Rule) => Rule.required().error('Category is required'),
      options: {
        list: [
          {title: 'Getting Started', value: 'Getting Started'},
          {title: 'Tools & Platforms', value: 'Tools & Platforms'},
          {title: 'Research & Policy', value: 'Research & Policy'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
      description: 'URL to an external resource',
    }),
    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file',
      description: 'Upload a downloadable file (PDF, doc, etc.)',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Select relevant tags for discoverability',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'AI', value: 'AI'},
              {title: 'Machine Learning', value: 'Machine Learning'},
              {title: 'Education', value: 'Education'},
              {title: 'Community', value: 'Community'},
              {title: 'Ethics', value: 'Ethics'},
              {title: 'Policy', value: 'Policy'},
              {title: 'Tools', value: 'Tools'},
              {title: 'Tutorial', value: 'Tutorial'},
              {title: 'Workshop', value: 'Workshop'},
              {title: 'Beginner', value: 'Beginner'},
              {title: 'Intermediate', value: 'Intermediate'},
              {title: 'Advanced', value: 'Advanced'},
            ],
          },
        },
      ],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order within category. Must be a unique positive integer if provided',
      validation: (Rule) => [
        Rule.integer().positive().error('Order must be a positive integer'),
        Rule.custom(async (order, context) => {
          if (order == null) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const category = context.document?.category
          const count = await client.fetch(
            `count(*[_type == "resource" && order == $order && category == $category && !(_id in [$draftId, $publishedId])])`,
            {order, category, draftId: `drafts.${id}`, publishedId: id},
          )
          if (count > 0)
            return `Another resource in "${category}" already uses order ${order}`
          return true
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active resources are displayed on the site',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Category then Order',
      name: 'categoryOrder',
      by: [
        {field: 'category', direction: 'asc'},
        {field: 'order', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      icon: 'icon',
      isActive: 'isActive',
    },
    prepare({title, subtitle, icon, isActive}) {
      const status = isActive === false ? ' [INACTIVE]' : ''
      return {
        title: `${icon || ''} ${title}${status}`,
        subtitle,
      }
    },
  },
})
