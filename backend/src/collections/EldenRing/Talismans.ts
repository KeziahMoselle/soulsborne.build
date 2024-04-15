import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

const ERTalismans: CollectionConfig = {
  slug: 'er-talismans',
  labels: {
    singular: 'Talisman',
    plural: 'Talismans',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  access: {
    read: isPublic
  },
  timestamps: true,
  versions: true,
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'er-media',
    },
    {
      name: 'weight',
      label: 'Weight',
      type: 'number',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      unique: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText'
    },
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'effect',
      label: 'Effect',
      type: 'richText'
    },
    lexicalHTML('effect', { name: 'effect_html' }),
  ],
}

export default ERTalismans
