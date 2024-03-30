import { buildConfig } from 'payload/config'
import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

import { seed } from './endpoints/seed'

import Users from './collections/Users'
import Archetype from './collections/Archetype'
import Restrictions from './collections/Restrictions'
import ERCollections from './collections/EldenRing'


const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: 'auto',
    endpoint: process.env.S3_ENDPOINT
  },
  bucket: process.env.S3_BUCKET,
})

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
          ...config,
          resolve: {
              ...config.resolve,
              alias: {
                  ...config.resolve.alias,
                  'fs': {},
              }
          }
      };
  },
  },
  csrf: [
    // whitelist of domains to allow cookie auth from
    'http://j8kk408.51.178.142.187.sslip.io',
    'http://localhost:3000',
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
  plugins: [
    cloudStorage({
      enabled: true,
      collections: {
        'er-medias': {
          adapter,
        },
      },
    }),
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
