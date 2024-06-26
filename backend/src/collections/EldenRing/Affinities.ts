import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'

const ERAffinities: CollectionConfig = {
  slug: 'er-affinities',
  labels: {
    singular: 'Affinity',
    plural: 'Affinities',
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
      name: 'type',
      label: 'Type',
      type: 'select',
      options: [
        'Physical',
        'Magic',
        'Flame',
        'Golden',
        'Occult'
      ]
    },
    {
      name: 'affected_statistics',
      label: 'Affected Statistics',
      type: 'relationship',
      relationTo: 'er-statistics',
      hasMany: true
    }
  ],
}

export default ERAffinities
