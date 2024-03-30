import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../../access/isVisitor'

const ERTalismans: CollectionConfig = {
  slug: 'er-talismans',
  labels: {
    singular: 'Talisman',
    plural: 'Talismans',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  access: {
    read: isVisitor
  },
  timestamps: true,
  versions: true,
  fields: [
    /* {
      name: 'image',
      label: 'Image',
      type: 'upload',
    }, */
    {
      name: 'weight',
      label: 'Weight',
      type: 'number',
      admin: {
        position: 'sidebar',
      }
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
    {
      name: 'effect',
      label: 'Effect',
      type: 'richText'
    },
  ],
}

export default ERTalismans
