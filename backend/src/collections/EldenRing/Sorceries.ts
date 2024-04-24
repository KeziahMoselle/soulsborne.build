import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'

const ERSorceries: CollectionConfig = {
  slug: 'er-sorceries',
  labels: {
    singular: 'Sorcery',
    plural: 'Sorceries',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  access: {
    read: isPublic,
    delete: isAdmin,
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
    {
      name: 'sorcery_type',
      label: 'Sorcery Type',
      type: 'relationship',
      relationTo: 'er-sorcery-types',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'slots',
      label: 'Slots',
      type: 'number',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'cost',
      label: 'FP Cost',
      type: 'number',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'requirements',
      label: 'Requirements',
      type: 'array',
      admin: {
        position: 'sidebar'
      },
      fields: [
        {
          name: 'statistic',
          label: 'Statistic',
          type: 'relationship',
          relationTo: 'er-statistics',
          required: true,
        },
        {
          name: 'value',
          label: 'Minimum Value',
          type: 'number',
          required: true,
        },
      ]
    },
  ],
}

export default ERSorceries
