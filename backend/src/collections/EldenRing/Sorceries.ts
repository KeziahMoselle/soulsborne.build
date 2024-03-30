import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../../access/isVisitor'

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
    read: isVisitor
  },
  timestamps: true,
  versions: true,
  fields: [
    /* {
      name: 'image',
      label: 'Image',
      type: 'upload',
    }, */
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
    {
      name: 'effect',
      label: 'Effect',
      type: 'richText'
    },
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
