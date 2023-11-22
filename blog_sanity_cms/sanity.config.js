import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'blog_sanity_cms',

  projectId: 'your-project-id',
  dataset: 'dataset-name',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
