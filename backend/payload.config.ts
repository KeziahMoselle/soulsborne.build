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
import { buildConfig } from 'payload/config'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'

import Users from './src/collections/Users'
import Archetype from './src/collections/Archetype'
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

export default buildConfig({
  cors: ALLOWED_ORIGINS,
  csrf: ALLOWED_ORIGINS,
  editor: lexicalEditor(),
  collections: [Users, Archetype, Restrictions, ...ERCollections],
  secret: process.env.PAYLOAD_SECRET || '',
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
})
