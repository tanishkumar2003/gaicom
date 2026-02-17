import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  groups: [
    {name: 'hero', title: 'Hero Section'},
    {name: 'story', title: 'Story Section'},
    {name: 'values', title: 'Values Section'},
  ],
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Our Story',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      group: 'hero',
      initialValue:
        'Founded in Livingston, NJ, GAICOM is a nonprofit dedicated to making generative AI accessible, understandable, and beneficial for every community.',
    }),
    defineField({
      name: 'storyHeading',
      title: 'Story Heading',
      type: 'string',
      group: 'story',
      initialValue: 'Why We Exist',
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      group: 'story',
      of: [{type: 'text'}],
    }),
    defineField({
      name: 'valuesHeading',
      title: 'Values Heading',
      type: 'string',
      group: 'values',
      initialValue: 'Our Values',
    }),
    defineField({
      name: 'valuesSubheading',
      title: 'Values Subheading',
      type: 'text',
      group: 'values',
      initialValue: 'The principles that guide everything we do at GAICOM.',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'values',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string'}),
            defineField({name: 'icon', title: 'Icon', type: 'string'}),
            defineField({name: 'description', title: 'Description', type: 'text'}),
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
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
