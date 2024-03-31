import { CollectionConfig } from 'payload/types'
import { isAdmin } from '../access/isAdmin'
import { isSelf } from '../access/isSelf'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  timestamps: true,
  access: {
    admin: isAdmin,
    update: isAdmin || isSelf,
    read: isAdmin || isSelf
  },
  fields: [
    {
      name: 'name',
      label: 'Username',
      type: 'text',
      unique: true,
      required: true,
      saveToJWT: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      saveToJWT: true,
      defaultValue: 'user',
      access: {
        update: isAdmin,
        create: isAdmin
      },
      options: [
        'admin',
        'developer',
        'editor',
        'user',
      ],
    },
  ],
}

export default Users
