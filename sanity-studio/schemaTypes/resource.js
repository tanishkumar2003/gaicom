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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Getting Started', value: 'Getting Started'},
          {title: 'Tools & Platforms', value: 'Tools & Platforms'},
          {title: 'Research & Policy', value: 'Research & Policy'},
        ],
      },
    }),
    defineField({
      name: 'link',
      title: 'External Link',
      type: 'url',
    }),
    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
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
    },
    prepare({title, subtitle, icon}) {
      return {
        title: `${icon || ''} ${title}`,
        subtitle,
      }
    },
  },
})
