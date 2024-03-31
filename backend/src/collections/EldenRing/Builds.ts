import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

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
    read: isPublic
  },
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
    /* {
      name: 'images',
      label: 'Build Images',
      type: 'array',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
        }
      ]
    } */
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
      name: 'archetype',
      label: 'Archetype',
      type: 'relationship',
      relationTo: 'archetypes',
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
                }
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
                  relationTo: 'er-weapons',
                },
                {
                  name: 'shield',
                  label: 'Shield',
                  type: 'relationship',
                  relationTo: 'er-shields',
                },
                {
                  name: 'ash_of_war',
                  label: 'Ash of War',
                  type: 'relationship',
                  relationTo: 'er-ashes-of-war'
                }
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
          ]
        },
        {
          label: 'Statistics',
          description: 'Required attributes to use this build',
          fields: [
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
    }
  ],
}

export default ERBuilds
