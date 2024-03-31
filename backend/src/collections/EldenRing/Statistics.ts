import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

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
