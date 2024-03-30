import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      saveToJWT: true,
      defaultValue: 'user',
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
