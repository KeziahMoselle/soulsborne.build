import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic'
import { isUser } from '../access/isUser'
import { lexicalHTML } from '@payloadcms/richtext-lexical';
import { isAdminFieldLevel } from '@/access/isAdmin';

const Sliders: CollectionConfig = {
  slug: 'sliders',
  labels: {
    singular: 'Slider',
    plural: 'Sliders',
  },
  admin: {
    description: 'Sliders created by users',
    hidden({ user }) {
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: isPublic,
    create: isUser,
  },
  timestamps: true,
  fields: [
    /**
     * Sliders informations
     */
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
    {
      name: 'youtube_url',
      label: 'YouTube URL',
      type: 'text'
    },
    {
      name: 'images',
      label: 'Build Images',
      type: 'array',
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'fashion-media',
        },
      ]
    },
    {
      name: 'votes',
      label: 'Votes',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      maxDepth: 0,
      unique: true,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel
      },
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'votes_count',
      label: 'Votes count',
      type: 'number',
      defaultValue: 0,
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel
      },
      admin: {
        position: 'sidebar'
      }
    },

    /**
     * Metadata
     */
    {
      label: 'Created by',
      name: 'created_by',
      type: 'relationship',
      relationTo: 'users',
      access: {
        read: () => true,
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => !!data?.created_by,
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (req.user) {
          if (operation === 'create') {
            data.created_by = req.user.id;
            data.votes_count = 0;
          }

          return data;
        }
      },
      ({ req, operation, data }) => {
        if (req.user) {
          if (operation === 'update') {
            data.votes_count = data.votes.length;
          }

          return data;
        }
      },
    ],
  },
}

export default Sliders
