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
      validation: (Rule) => Rule.required().min(3).max(150),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'dateDisplay',
      title: 'Date Display',
      type: 'string',
      description: 'How the date appears on cards, e.g. "March 24" or "June 10-12"',
      validation: (Rule) => Rule.max(50),
      group: 'content',
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required().error('Start date and time is required'),
      group: 'content',
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'Must be after the start date/time',
      group: 'content',
      validation: (Rule) =>
        Rule.custom((endDateTime, context) => {
          if (!endDateTime) return true
          const startDateTime = context.document?.startDateTime
          if (startDateTime && new Date(endDateTime) <= new Date(startDateTime)) {
            return 'End date/time must be after start date/time'
          }
          return true
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required().min(10).max(1000),
      group: 'content',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Select a common location or type a custom one',
      group: 'content',
      options: {
        list: [
          {title: 'Livingston, NJ', value: 'Livingston, NJ'},
          {title: 'Virtual (Zoom)', value: 'Virtual (Zoom)'},
          {title: 'Virtual (Google Meet)', value: 'Virtual (Google Meet)'},
          {title: 'Hybrid', value: 'Hybrid'},
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Event banner or promotional image',
      group: 'media',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
      description: 'Required for upcoming events. Link where attendees can register',
      group: 'links',
      validation: (Rule) =>
        Rule.custom((registrationLink, context) => {
          const startDateTime = context.document?.startDateTime
          if (startDateTime && new Date(startDateTime) > new Date() && !registrationLink) {
            return 'Registration link is required for upcoming events'
          }
          return true
        }),
    }),
    defineField({
      name: 'recapLink',
      title: 'Recap Link',
      type: 'url',
      description: 'Optional. Link to event recap, recording, or summary for past events',
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
