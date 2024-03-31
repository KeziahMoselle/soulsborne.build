import { buildConfig } from 'payload/config'
import path from 'path'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
// import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
// import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'

import { seed } from './endpoints/seed'
import { register } from './endpoints/register'

import Users from './collections/Users'
import Archetype from './collections/Archetype'
import Restrictions from './collections/Restrictions'
import ERCollections from './collections/EldenRing'

const ALLOWED_URLS = [
  // Back
  'https://payload.soulsborne.build',
  'http://localhost:3000',
  // Front
  'https://soulsborne.build',
  'https://soulsborne-build.pages.dev',
  'http://localhost:4321',
]

// const mockModulePath = path.resolve(__dirname, 'mocks/emptyObject.js')


/* const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: 'auto',
    endpoint: process.env.S3_ENDPOINT
  },
  bucket: process.env.S3_BUCKET,
}) */

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    /* webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            fs: mockModulePath,
            util: mockModulePath,
            os: mockModulePath,
            process: mockModulePath,
          },
        },
      }
    }, */
  },
  cors: ALLOWED_URLS,
  csrf: ALLOWED_URLS,
  editor: slateEditor({}),
  collections: [Users, Archetype, Restrictions, ...ERCollections],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  endpoints: [
    {
      path: '/register',
      method: 'post',
      handler: register,
    },
    {
      path: '/seed',
      method: 'get',
      handler: seed,
    },
  ],
  plugins: [
    /* cloudStorage({
      enabled: true,
      collections: {
        'er-medias': {
          adapter,
        },
      },
    }), */
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
