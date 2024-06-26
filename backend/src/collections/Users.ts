import { CollectionConfig } from 'payload/types'
import { isAdmin, isAdminFieldLevel } from '../access/isAdmin'
import { isAdminOrSelf } from '../access/isAdminOrSelf'
import { lexicalHTML } from '@payloadcms/richtext-lexical'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    hidden({ user }) {
      return !user?.roles?.includes('admin')
    },
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
      saveToJWT: true,
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
    lexicalHTML('bio', { name: 'bio_html' }),
    {
      name: 'roles',
      label: 'Roles',
      type: 'select',
      hasMany: true,
      required: true,
      saveToJWT: true,
      defaultValue: 'user',
      access: {
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
