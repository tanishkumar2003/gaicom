import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'media', title: 'Media'},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      group: 'content',
    }),
    defineField({
      name: 'dateDisplay',
      title: 'Date Display',
      type: 'string',
      description: 'How the date appears on cards, e.g. "March 24"',
      group: 'content',
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      group: 'media',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'For upcoming events',
      group: 'links',
    }),
    defineField({
      name: 'recapLink',
      title: 'Recap Link',
      type: 'url',
      description: 'For past events',
      group: 'links',
    }),
  ],
  orderings: [
    {
      title: 'Date Ascending',
      name: 'dateAsc',
      by: [{field: 'startDateTime', direction: 'asc'}],
    },
    {
      title: 'Date Descending',
      name: 'dateDesc',
      by: [{field: 'startDateTime', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      startDateTime: 'startDateTime',
      media: 'image',
    },
    prepare({title, startDateTime, media}) {
      const now = new Date()
      const eventDate = startDateTime ? new Date(startDateTime) : null
      const prefix = eventDate && eventDate > now ? '[UPCOMING]' : '[PAST]'
      return {
        title: `${prefix} ${title}`,
        subtitle: eventDate ? eventDate.toLocaleDateString() : 'No date',
        media,
      }
    },
  },
})
