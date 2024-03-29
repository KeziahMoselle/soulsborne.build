import { CollectionConfig } from 'payload/types'

const Restrictions: CollectionConfig = {
  slug: 'restrictions',
  labels: {
    singular: 'Restriction',
    plural: 'Restrictions',
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

export default Restrictions
