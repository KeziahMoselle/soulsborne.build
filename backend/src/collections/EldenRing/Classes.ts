import { CollectionConfig } from 'payload/types'

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
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text'
    },
    {
      name: 'weapons',
      label: 'Starting Weapons',
      type: 'relationship',
      relationTo: 'er-weapons',
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
