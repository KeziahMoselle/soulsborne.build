import path from 'path'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { en } from '@payloadcms/translations/languages/en'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

/**
 * Collections
 */

// General collections
import Archetypes from '@/collections/Archetypes'
import Media from '@/collections/Media'
import Preregistrations from '@/collections/Preregistrations'
import Restrictions from '@/collections/Restrictions'
import Users from '@/collections/Users'

// Fashion
import Fashion from '@/collections/Fashion'
import FashionMedia from '@/collections/FashionMedia'

// Sliders
import Sliders from '@/collections/Sliders'
import SlidersMedia from '@/collections/SlidersMedia'

// Games
import ERCollections from '@/collections/EldenRing'


/**
 * CORS
 */

export const ALLOWED_ORIGINS = [
  // Back
  'https://payload.soulsborne.build',
  'http://localhost:3000',
  // Front
  'https://soulsborne.build',
  'https://soulsborne-build.pages.dev',
  'http://localhost:4321',
]

/**
 * S3 Uploads
 */

const adapter = s3Adapter({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: 'auto',
    endpoint: process.env.S3_ENDPOINT,
  },
  bucket: process.env.S3_BUCKET,
})

/**
 * Configuration
 */

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: ALLOWED_ORIGINS,
  csrf: ALLOWED_ORIGINS,
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HTMLConverterFeature({}),
    ],
  }),
  collections: [
    // General collections
    Archetypes,
    Fashion,
    FashionMedia,
    Media,
    Preregistrations,
    Restrictions,
    Sliders,
    SlidersMedia,
    Users,
    // Games
    ...ERCollections,
  ],
  plugins: [
    cloudStorage({
      collections: {
        media: {
          adapter,
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => `https://cdn.soulsborne.build/${prefix}/${filename}`,
          prefix: 'media',
        },
        'er-media': {
          adapter,
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => `https://cdn.soulsborne.build/${prefix}/${filename}`,
          prefix: 'er-media',
        },
        'fashion-media': {
          adapter,
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => `https://cdn.soulsborne.build/${prefix}/${filename}`,
          prefix: 'fashion-media',
        },
        'sliders-media': {
          adapter,
          disablePayloadAccessControl: true,
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => `https://cdn.soulsborne.build/${prefix}/${filename}`,
          prefix: 'sliders-media',
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'jawliejfilwajefSEANlawefawfewag349jwgo3gj4w',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI,
    },
  }),
  admin: {
    user: Users.slug,
  },
  i18n: {
    supportedLanguages: { en },
  },
  sharp,
})
