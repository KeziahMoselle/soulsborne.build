import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'

const Preregistrations: CollectionConfig = {
  slug: 'preregistrations',
  admin: {
    useAsTitle: 'email',
  },
  timestamps: true,
  disableDuplicate: true,
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      unique: true,
      required: true,
    },
  ],
}

export default Preregistrations
