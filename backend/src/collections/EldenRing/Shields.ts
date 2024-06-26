import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'

const ERShields: CollectionConfig = {
  slug: 'er-shields',
  labels: {
    singular: 'Shield',
    plural: 'Shields',
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
      name: 'shield_type',
      label: 'Shield Type',
      type: 'select',
      options: [
        'Small Shield',
        'Medium Shield',
        'Greatshield'
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'skill',
      label: 'Skill',
      type: 'relationship',
      relationTo: 'er-skills',
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
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'weight',
      label: 'Weight',
      type: 'number',
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'attack',
      label: 'Attack',
      type: 'group',
      fields: [
        {
          name: 'physical',
          label: 'Physical Damage',
          type: 'number',
        },
        {
          name: 'magic',
          label: 'Magic Damage',
          type: 'number',
        },
        {
          name: 'fire',
          label: 'Fire Damage',
          type: 'number',
        },
        {
          name: 'lightning',
          label: 'Lightning Damage',
          type: 'number',
        },
        {
          name: 'holy',
          label: 'Holy Damage',
          type: 'number',
        },
        {
          name: 'critical',
          label: 'Critical Damage',
          type: 'number',
        },
      ]
    },
    {
      name: 'defense',
      label: 'Defense',
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
          name: 'boost',
          label: 'Boost',
          type: 'number',
        },
      ]
    },
    {
      name: 'scaling',
      label: 'Scaling',
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
          name: 'letter',
          label: 'Scaling Letter',
          type: 'select',
          options: [
            'S',
            'A',
            'B',
            'C',
            'D',
            'E',
            'TODO'
          ],
          required: true,
        },
      ]
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
    {
      name: 'passives',
      label: 'Passives',
      type: 'relationship',
      relationTo: 'er-status-effects',
      hasMany: true,
    }
  ],
}

export default ERShields
