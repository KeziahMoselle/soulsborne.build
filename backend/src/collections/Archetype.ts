import { CollectionConfig } from 'payload/types'

const Archetypes: CollectionConfig = {
  slug: 'archetypes',
  labels: {
    singular: 'Archetype',
    plural: 'Archetypes',
  },
  admin: {
    useAsTitle: 'name',
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
