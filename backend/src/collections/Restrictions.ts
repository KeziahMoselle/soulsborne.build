import { CollectionConfig } from 'payload/types'
import { isVisitor } from '../access/isVisitor'

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

export default Restrictions
