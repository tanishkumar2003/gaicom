import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'GAICOM',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
      initialValue: 'gaicomnj@gmail.com',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Livingston, NJ',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
            defineField({name: 'icon', title: 'Icon', type: 'string'}),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
