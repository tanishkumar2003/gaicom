import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Singleton document types
const singletonTypes = new Set(['siteSettings', 'homePage', 'aboutPage', 'donatePage'])

// Singleton document IDs
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'gaicom-cms',

  projectId: '02ubmxqm',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('About Page')
              .id('aboutPage')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Donate Page')
              .id('donatePage')
              .child(S.document().schemaType('donatePage').documentId('donatePage')),
            S.divider(),
            // Collections
            S.documentTypeListItem('heroSlide').title('Hero Slides'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('event').title('Events'),
            S.documentTypeListItem('resource').title('Resources'),
            S.divider(),
            // Blog
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('author').title('Authors'),
            S.divider(),
            // Donate
            S.documentTypeListItem('donationTier').title('Donation Tiers'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter singletons from the "new document" menu
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    // For singletons, filter out actions that are not explicitly listed
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({action}) => action && singletonActions.has(action))
        : input,
  },
})
