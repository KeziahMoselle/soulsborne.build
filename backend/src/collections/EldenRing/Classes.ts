import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { isAdmin } from '@/access/isAdmin'

const ERStatistics: CollectionConfig = {
  slug: 'er-classes',
  labels: {
    singular: 'Class',
    plural: 'Classes',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  access: {
    read: isPublic,
    delete: isAdmin,
  },
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
      name: 'rune_level',
      label: 'Starting Rune Level',
      type: 'number',
    },
    {
      name: 'weapons',
      label: 'Starting Weapons',
      type: 'relationship',
      relationTo: 'er-weapons',
      hasMany: true
    },
    {
      name: 'shields',
      label: 'Starting Shields',
      type: 'relationship',
      relationTo: 'er-shields',
      hasMany: true
    },
    {
      name: 'sorceries',
      label: 'Starting Sorceries',
      type: 'relationship',
      relationTo: 'er-sorceries',
      hasMany: true
    },
    {
      name: 'incantations',
      label: 'Starting Incantations',
      type: 'relationship',
      relationTo: 'er-incantations',
      hasMany: true
    },
    {
      name: 'ammunitions',
      label: 'Starting Ammunitions',
      type: 'relationship',
      relationTo: 'er-ammunitions',
      hasMany: true
    },
    {
      name: 'statistics',
      label: 'Starting Statistics',
      type: 'array',
      fields: [
        {
          name: 'stat',
          label: 'Statistic',
          type: 'relationship',
          relationTo: 'er-statistics',
        },
        {
          name: 'value',
          label: 'Level',
          type: 'number',
        }
      ]
    }
  ],
}

export default ERStatistics
