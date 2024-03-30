import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../access/isVisitor'

const Archetypes: CollectionConfig = {
  slug: 'archetypes',
  labels: {
    singular: 'Archetype',
    plural: 'Archetypes',
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: isVisitor
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
  ],
}

export default Archetypes
