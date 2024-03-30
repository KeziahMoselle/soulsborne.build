import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../../access/isVisitor'

const ERStatusEffects: CollectionConfig = {
  slug: 'er-status-effects',
  labels: {
    singular: 'Status Effect',
    plural: 'Status Effects',
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
    {
      name: 'effect',
      label: 'Effect',
      type: 'richText'
    },
  ],
}

export default ERStatusEffects
