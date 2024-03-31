import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

const ERStatistics: CollectionConfig = {
  slug: 'er-skills',
  labels: {
    singular: 'Skill',
    plural: 'Skills',
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
      name: 'fp_cost',
      label: 'FP Cost',
      type: 'number',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText'
    },
    {
      name: 'location',
      label: 'Location',
      type: 'richText'
    },
  ],
}

export default ERStatistics
