import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

const ERSorceryType: CollectionConfig = {
  slug: 'er-sorcery-types',
  labels: {
    singular: 'Sorcery Type',
    plural: 'Sorceries Types',
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
  ],
}

export default ERSorceryType
