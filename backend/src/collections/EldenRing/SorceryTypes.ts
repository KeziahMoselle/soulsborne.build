import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../../access/isVisitor'

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
    read: isVisitor
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

export default ERSorceryType
