import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'

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
    read: isPublic,
    delete: isAdmin,
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
    lexicalHTML('description', { name: 'description_html' }),
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
