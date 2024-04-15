import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

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
    read: isPublic
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
    lexicalHTML('description', { name: 'description_html' }),
  ],
}

export default Archetypes
