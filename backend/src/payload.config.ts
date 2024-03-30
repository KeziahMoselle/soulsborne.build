import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import { seed } from './endpoints/seed'

import Users from './collections/Users'
import Archetype from './collections/Archetype'
import Restrictions from './collections/Restrictions'
import ERCollections from './collections/EldenRing'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  csrf: [
    // whitelist of domains to allow cookie auth from
    'https://soulsborne-build.pages.dev',
    'http://localhost:4321',
  ],
  editor: slateEditor({}),
  collections: [Users, Archetype, Restrictions, ...ERCollections],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  endpoints: [
    // The seed endpoint is used to populate the database with some example data
    // You should delete this endpoint before deploying your site to production
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  plugins: [],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
