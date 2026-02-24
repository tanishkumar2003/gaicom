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
      description: 'e.g. "Supporter", "Advocate", "Champion"',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'amount',
      title: 'Amount ($)',
      type: 'number',
      validation: (Rule) => [
        Rule.required().error('Amount is required'),
        Rule.positive().integer().error('Amount must be a positive whole dollar amount'),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What the donor gets or what their donation supports',
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Most Popular)',
      type: 'boolean',
      description: 'Only one tier can be featured at a time',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (featured, context) => {
          if (!featured) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "donationTier" && featured == true && !(_id in [$draftId, $publishedId])])`,
            {draftId: `drafts.${id}`, publishedId: id},
          )
          if (count > 0)
            return 'Only one donation tier can be featured. Unmark the other tier first'
          return true
        }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display position. Must be a unique positive integer',
      validation: (Rule) => [
        Rule.required().error('Order is required'),
        Rule.integer().positive().error('Order must be a positive integer'),
        Rule.custom(async (order, context) => {
          if (order == null) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "donationTier" && order == $order && !(_id in [$draftId, $publishedId])])`,
            {order, draftId: `drafts.${id}`, publishedId: id},
          )
          if (count > 0) return `Another donation tier already uses order ${order}`
          return true
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Only active tiers are shown. Maximum 6 active tiers allowed',
      initialValue: true,
      validation: (Rule) =>
        Rule.custom(async (isActive, context) => {
          if (!isActive) return true
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = (context.document._id || '').replace(/^drafts\./, '')
          const count = await client.fetch(
            `count(*[_type == "donationTier" && isActive == true && !(_id in [$draftId, $publishedId])])`,
            {draftId: `drafts.${id}`, publishedId: id},
          )
          if (count >= 6)
            return 'Maximum 6 active donation tiers allowed. Deactivate another tier first'
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
      label: 'label',
      amount: 'amount',
      order: 'order',
      featured: 'featured',
      isActive: 'isActive',
    },
    prepare({label, amount, order, featured, isActive}) {
      const badges = []
      if (featured) badges.push('[FEATURED]')
      if (isActive === false) badges.push('[INACTIVE]')
      const suffix = badges.length > 0 ? ` ${badges.join(' ')}` : ''
      return {
        title: `${order ?? '?'}. ${label || 'Untitled'}${suffix}`,
        subtitle: amount ? `$${amount}` : '',
      }
    },
  },
})
