import path from 'path'
import {
  AlignFeature,
  BlockQuoteFeature,
  BlocksFeature,
  BoldFeature,
  CheckListFeature,
  HeadingFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  RelationshipFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { en } from '@payloadcms/translations/languages/en'
import { buildConfig } from 'payload/config'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import Users from './src/collections/Users'
import Archetypes from './src/collections/Archetypes'
import Media from '@/collections/Media'
import Restrictions from './src/collections/Restrictions'
import ERCollections from './src/collections/EldenRing'

export const ALLOWED_ORIGINS = [
  // Back
  'https://payload.soulsborne.build',
  'https://dev-payload.soulsborne.build',
  'http://localhost:3000',
  // Front
  'https://soulsborne.build',
  'https://soulsborne-build.pages.dev',
  'http://localhost:4321',
]

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)


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
  cors: ALLOWED_ORIGINS,
  csrf: ALLOWED_ORIGINS,
  editor: lexicalEditor(),
  collections: [Users, Media, Archetypes, Restrictions, ...ERCollections],
  plugins: [
    cloudStorage({
      collections: {
        'media': {
          adapter,
          disablePayloadAccessControl: true,
        },
        'er-media': {
          adapter,
          disablePayloadAccessControl: true,
        },
      }
    })
  ],
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI,
    },
  }),
  admin: {
    user: Users.slug
  },
  i18n: {
    supportedLanguages: { en },
  },
  sharp
})
