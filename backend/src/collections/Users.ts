import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '../access/isAdminOrSelf'
import { isSelfFieldLevel } from '../access/isSelf'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  timestamps: true,
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
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
      name: 'roles',
      label: 'Roles',
      type: 'select',
      hasMany: true,
      required: true,
      saveToJWT: true,
      defaultValue: 'user',
      access: {
        read: isAdminOrSelfFieldLevel,
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      options: [
        'admin',
        'editor',
        'user',
      ],
    },
    {
      name: 'votes',
      label: 'Votes',
      type: 'group',
      fields: [
        {
          name: 'eldenring',
          label: 'Elden Ring Builds',
          type: 'relationship',
          relationTo: 'er-builds',
          hasMany: true,
          access: {
            read: isSelfFieldLevel,
            create: isSelfFieldLevel,
            update: isSelfFieldLevel,
          },
          admin: {
            readOnly: true,
          }
        },
      ]
    }
  ],
}

export default Users
