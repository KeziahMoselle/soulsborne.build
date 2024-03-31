import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

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
    read: isPublic
  },
  fields: [
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
    // todo: sorceries
    // todo: incantations
  ],
}

export default ERStatistics
