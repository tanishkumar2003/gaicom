import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
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
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      group: 'hero',
      initialValue:
        'Founded in Livingston, NJ, GAICOM is a nonprofit dedicated to making generative AI accessible, understandable, and beneficial for every community.',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'storyHeading',
      title: 'Story Heading',
      type: 'string',
      group: 'story',
      initialValue: 'Why We Exist',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'storyParagraphs',
      title: 'Story Paragraphs',
      type: 'array',
      group: 'story',
      of: [{type: 'text'}],
      description: 'At least one paragraph is required to tell the story',
      validation: (Rule) => Rule.required().min(1).error('At least one story paragraph is required'),
    }),
    defineField({
      name: 'valuesHeading',
      title: 'Values Heading',
      type: 'string',
      group: 'values',
      initialValue: 'Our Values',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'valuesSubheading',
      title: 'Values Subheading',
      type: 'text',
      group: 'values',
      initialValue: 'The principles that guide everything we do at GAICOM.',
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'values',
      description: 'Organization values (maximum 6)',
      validation: (Rule) => Rule.required().min(1).max(6).error('Between 1 and 6 values are required'),
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
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji or icon identifier for this value',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required().min(10).max(300),
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
  ],
  preview: {
    prepare() {
      return {title: 'About Page'}
    },
  },
})
