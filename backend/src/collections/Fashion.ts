import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic'
import { isUser } from '../access/isUser'
import { GameSelectField } from '@/fields/GameSelectField';
import { lexicalHTML } from '@payloadcms/richtext-lexical';

const Fashion: CollectionConfig = {
  slug: 'fashion',
  labels: {
    singular: 'Fashion',
    plural: 'Fashion',
  },
  access: {
    read: isPublic,
    create: isUser
  },
  versions: true,
  timestamps: true,
  fields: [
    /**
     * Fashion informations
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
      label: 'Images',
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
    GameSelectField,

    /**
     * Equipment
     */
    {
      name: 'mainhand_weapons',
      label: 'Mainhand weapons',
      type: 'relationship',
      relationTo: ['er-weapons', 'er-shields']
    },
    {
      name: 'offhand_weapons',
      label: 'Off-hand weapons',
      type: 'relationship',
      relationTo: ['er-weapons', 'er-shields']
    },
    {
      name: 'magic',
      label: 'Magic',
      type: 'relationship',
      relationTo: ['er-sorceries', 'er-incantations'],
      hasMany: true
    },
    {
      name: 'armors',
      label: 'Armors',
      type: 'relationship',
      relationTo: 'er-armors',
      hasMany: true
    },

    /** Metadata */
    {
      name: 'votes',
      label: 'Votes',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      maxDepth: 0,
      unique: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'votes_count',
      label: 'Votes count',
      type: 'number',
      defaultValue: 0,
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

export default Fashion
