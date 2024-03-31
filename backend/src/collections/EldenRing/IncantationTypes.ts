import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

const ERIncantationType: CollectionConfig = {
  slug: 'er-incantation-types',
  labels: {
    singular: 'Incantation Type',
    plural: 'Incantations Types',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  access: {
    read: isPublic
  },
  fields: [
    /* {
      name: 'image',
      label: 'Image',
      type: 'upload',
    }, */
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

export default ERIncantationType
