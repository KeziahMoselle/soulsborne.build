import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../../access/isVisitor'

const ERArmors: CollectionConfig = {
  slug: 'er-armors',
  labels: {
    singular: 'Armor',
    plural: 'Armors',
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
      name: 'armor_type',
      label: 'Armor Type',
      type: 'select',
      options: [
        'Helm',
        'Chest',
        'Gauntlet',
        'Leg'
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
      name: 'weight',
      label: 'Weight',
      type: 'number',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'damage_negation',
      label: 'Damage Negation',
      type: 'group',
      fields: [
        {
          name: 'physical',
          label: 'Physical',
          type: 'number',
        },
        {
          name: 'vs_strike',
          label: 'VS Strike',
          type: 'number',
        },
        {
          name: 'vs_slash',
          label: 'VS Slash',
          type: 'number',
        },
        {
          name: 'vs_pierce',
          label: 'VS Pierce',
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
      ]
    },
    {
      name: 'resistance',
      label: 'Resistance',
      type: 'group',
      fields: [
        {
          name: 'immunity',
          label: 'Immunity',
          type: 'number',
        },
        {
          name: 'robustness',
          label: 'Robustness',
          type: 'number',
        },
        {
          name: 'focus',
          label: 'Focus',
          type: 'number',
        },
        {
          name: 'vitality',
          label: 'Vitality',
          type: 'number',
        },
        {
          name: 'poise',
          label: 'Poise',
          type: 'number',
        },
      ]
    },
  ],
}

export default ERArmors
