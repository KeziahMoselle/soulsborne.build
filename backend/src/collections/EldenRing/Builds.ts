import { CollectionConfig } from 'payload/types'
// import { SlugField } from '@nouance/payload-better-fields-plugin'
import { isPublic } from '../../access/isPublic'
import { isUser } from '../../access/isUser'

const ERBuilds: CollectionConfig = {
  slug: 'er-builds',
  labels: {
    singular: 'Build',
    plural: 'Builds',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  access: {
    read: isPublic,
    create: isUser
  },
  timestamps: true,
  versions: true,
  fields: [
    /**
     * Build informations
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
          relationTo: 'er-media',
        },
      ]
    },
    /* ...SlugField({
      name: 'slug',
      admin: {
        position: 'sidebar'
      }
    }, {
      useFields: ['name']
    }), */
    {
      name: 'restrictions',
      label: 'Build Restrictions',
      type: 'relationship',
      relationTo: 'restrictions',
      hasMany: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'archetypes',
      label: 'Archetype',
      type: 'relationship',
      relationTo: 'archetypes',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      }
    },
    {
      name: 'is_two_handed',
      label: 'Is Two Handed?',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
      }
    },
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
     * Elden Ring specifics
     */
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Equipment',
          description: 'Weapons, Armor, Talismans, Arrow & Bolts',
          fields: [
            {
              name: 'mainhand_weapons',
              label: 'Mainhand weapons',
              type: 'array',
              maxRows: 3,
              fields: [
                {
                  name: 'weapon',
                  label: 'Weapon',
                  type: 'relationship',
                  relationTo: 'er-weapons',
                },
                {
                  name: 'ash_of_war',
                  label: 'Ash of War',
                  type: 'relationship',
                  relationTo: 'er-ashes-of-war'
                },
                {
                  name: 'affinity',
                  label: 'Affinity',
                  type: 'relationship',
                  relationTo: 'er-affinities'
                },
              ]
            },
            {
              name: 'offhand_weapons',
              label: 'Off-hand weapons',
              type: 'array',
              maxRows: 3,
              fields: [
                {
                  name: 'weapon',
                  label: 'Weapon',
                  type: 'relationship',
                  relationTo: ['er-weapons', 'er-shields'],
                },
                {
                  name: 'ash_of_war',
                  label: 'Ash of War',
                  type: 'relationship',
                  relationTo: 'er-ashes-of-war'
                },
                {
                  name: 'affinity',
                  label: 'Affinity',
                  type: 'relationship',
                  relationTo: 'er-affinities'
                },
              ]
            },
            {
              name: 'arrows',
              label: 'Arrows',
              type: 'relationship',
              relationTo: 'er-ammunitions',
              hasMany: true
            },
            {
              name: 'bolts',
              label: 'Bolts',
              type: 'relationship',
              relationTo: 'er-ammunitions',
              hasMany: true
            },
            {
              name: 'armors',
              label: 'Armors',
              type: 'relationship',
              relationTo: 'er-armors',
              hasMany: true
            },
            {
              name: 'talismans',
              label: 'Talismans',
              type: 'relationship',
              relationTo: 'er-talismans',
              hasMany: true
            },
            {
              name: 'sorceries',
              label: 'Sorceries',
              type: 'relationship',
              relationTo: 'er-sorceries',
              hasMany: true
            },
            {
              name: 'incantations',
              label: 'Incantations',
              type: 'relationship',
              relationTo: 'er-incantations',
              hasMany: true
            },
          ]
        },
        {
          label: 'Statistics',
          description: 'Required attributes to use this build',
          fields: [
            {
              name: 'level',
              label: 'Rune Level',
              type: 'number',
              max: 713,
              min: 1,
            },
            {
              name: 'starting_class',
              label: 'Starting Class',
              type: 'relationship',
              relationTo: 'er-classes'
            },
            {
              name: 'statistics',
              label: 'Statistics',
              type: 'array',
              fields: [
                {
                  name: 'stat',
                  label: 'Statistic',
                  type: 'relationship',
                  relationTo: 'er-statistics',
                },
                {
                  name: 'value',
                  label: 'Level',
                  type: 'number',
                }
              ]
            }
          ]
        },
      ]
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

export default ERBuilds
