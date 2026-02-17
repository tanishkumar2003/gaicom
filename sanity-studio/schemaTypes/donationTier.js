import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'donationTier',
  title: 'Donation Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "Supporter", "Advocate"',
    }),
    defineField({
      name: 'amount',
      title: 'Amount ($)',
      type: 'number',
      validation: (Rule) => Rule.positive().integer(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Most Popular)',
      type: 'boolean',
      initialValue: false,
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
      title: 'Order Ascending',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      label: 'label',
      amount: 'amount',
      order: 'order',
    },
    prepare({label, amount, order}) {
      return {
        title: `${order ?? '?'}. ${label || 'Untitled'}`,
        subtitle: amount ? `$${amount}` : '',
      }
    },
  },
})
