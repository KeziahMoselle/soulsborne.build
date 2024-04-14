import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf, isAdminOrSelfFieldLevel } from '../access/isAdminOrSelf'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  timestamps: true,
  disableDuplicate: true,
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  fields: [
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'name',
      label: 'Username',
      type: 'text',
      unique: true,
      required: true,
      saveToJWT: true,
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'richText',
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
  ],
}

export default Users
