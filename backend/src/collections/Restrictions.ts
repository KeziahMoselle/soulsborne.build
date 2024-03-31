import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic'

const Restrictions: CollectionConfig = {
  slug: 'restrictions',
  labels: {
    singular: 'Restriction',
    plural: 'Restrictions',
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
  ],
}

export default Restrictions
