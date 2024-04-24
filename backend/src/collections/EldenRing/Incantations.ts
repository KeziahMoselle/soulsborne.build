import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'

const ERIncantations: CollectionConfig = {
  slug: 'er-incantations',
  labels: {
    singular: 'Incantation',
    plural: 'Incantations',
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
      name: 'incantation_type',
      label: 'Incantation Type',
      type: 'relationship',
      relationTo: 'er-incantation-types',
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

export default ERIncantations
