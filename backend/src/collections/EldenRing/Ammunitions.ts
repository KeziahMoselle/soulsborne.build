import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../../access/isVisitor'

const ERAmmunitions: CollectionConfig = {
  slug: 'er-ammunitions',
  labels: {
    singular: 'Ammunition',
    plural: 'Ammunitions',
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
      name: 'ammunition_type',
      label: 'Type',
      type: 'select',
      options: [
        'Bolt',
        'Greatbolt'
      ],
      admin: {
        position: 'sidebar'
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
    {
      name: 'attack',
      label: 'Attack',
      type: 'group',
      fields: [
        {
          name: 'physical',
          label: 'Physical',
          type: 'number',
        },
        {
          name: 'magic',
          label: 'Magic',
          type: 'number',
        },
        {
          name: 'fire',
          label: 'Fire',
          type: 'number',
        },
        {
          name: 'lightning',
          label: 'Lightning',
          type: 'number',
        },
        {
          name: 'holy',
          label: 'Holy',
          type: 'number',
        },
        {
          name: 'critical',
          label: 'Critical',
          type: 'number',
        },
      ]
    },
    {
      name: 'passives',
      label: 'Passives',
      type: 'relationship',
      relationTo: 'er-status-effects'
    }
  ],
}

export default ERAmmunitions