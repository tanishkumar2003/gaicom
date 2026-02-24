import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content'},
    {name: 'media', title: 'Media'},
    {name: 'metadata', title: 'Metadata'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(5).max(200),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required().error('Slug is required. Click "Generate" to create one from the title'),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary shown in blog listings (10-300 characters)',
      validation: (Rule) => Rule.required().min(10).max(300),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      validation: (Rule) =>
        Rule.required().min(1).error('Blog post body cannot be empty'),
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.required()
                        .uri({allowRelative: true, scheme: ['http', 'https', 'mailto']})
                        .error('A valid URL is required for links'),
                  }),
                  defineField({
                    name: 'blank',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: true,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) =>
                Rule.required().error('Alt text is required for all inline images'),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Featured image for the blog post. Shown at top of post and in listings',
      validation: (Rule) => Rule.required().error('A main image is required'),
      group: 'media',
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Accessible description of the main image',
      validation: (Rule) =>
        Rule.required().min(5).max(200).error('Alt text is required for the main image (5-200 characters)'),
      group: 'media',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
      validation: (Rule) => Rule.required().error('An author is required'),
      group: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      description: 'Set this when making significant content updates',
      group: 'metadata',
      validation: (Rule) =>
        Rule.custom((updatedAt, context) => {
          if (!updatedAt) return true
          const publishedAt = context.document?.publishedAt
          if (publishedAt && new Date(updatedAt) < new Date(publishedAt)) {
            return 'Updated date cannot be before the published date'
          }
          return true
        }),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. "5 min read"',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d+\s*min\s*read$/i, {name: 'read time format'})
          .error('Read time is required (format: "5 min read")'),
      group: 'metadata',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Select one or more categories',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'AI Education', value: 'AI Education'},
              {title: 'Community Impact', value: 'Community Impact'},
              {title: 'Technology', value: 'Technology'},
              {title: 'Events', value: 'Events'},
              {title: 'Opinion', value: 'Opinion'},
              {title: 'Research', value: 'Research'},
              {title: 'Tutorial', value: 'Tutorial'},
              {title: 'News', value: 'News'},
            ],
          },
        },
      ],
      options: {layout: 'tags'},
      group: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'metadata',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Override for the page title tag (max 70 characters)',
      validation: (Rule) => Rule.max(70).warning('SEO titles should be under 70 characters'),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      description: 'Meta description for search engines (max 160 characters)',
      validation: (Rule) => Rule.max(160).warning('SEO descriptions should be under 160 characters'),
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Published Date Descending',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'mainImage',
      authorName: 'author.name',
    },
    prepare({title, publishedAt, media, authorName}) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString() : 'No date'
      return {
        title,
        subtitle: `${date}${authorName ? ` | ${authorName}` : ''}`,
        media,
      }
    },
  },
})
