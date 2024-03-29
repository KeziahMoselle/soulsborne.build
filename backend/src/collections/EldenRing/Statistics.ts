import { CollectionConfig } from 'payload/types'

const ERStatistics: CollectionConfig = {
  slug: 'er-statistics',
  labels: {
    singular: 'Statistic',
    plural: 'Statistics',
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
      name: 'description',
      label: 'Description',
      type: 'richText'
    },
    {
      name: 'softcaps',
      label: 'Soft Caps',
      type: 'array',
      fields: [
        {
          name: 'level',
          label: 'Level of "n" soft cap',
          type: 'number',
        }
      ]
    }
  ],
}

export default ERStatistics
