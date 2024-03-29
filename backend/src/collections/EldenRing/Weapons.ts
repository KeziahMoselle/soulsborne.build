import { CollectionConfig } from 'payload/types'

const ERWeapons: CollectionConfig = {
  slug: 'er-weapons',
  labels: {
    singular: 'Weapon',
    plural: 'Weapons',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  timestamps: true,
  versions: true,
  fields: [
    /* {
      name: 'image',
      label: 'Image',
      type: 'upload',
    }, */
    {
      name: 'weapon_type',
      label: 'Weapon Type',
      type: 'relationship',
      relationTo: 'er-weapon-types',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'skill',
      label: 'Skill',
      type: 'relationship',
      relationTo: 'er-skills',
      admin: {
        position: 'sidebar'
      }
    },
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
      name: 'weight',
      label: 'Weight',
      type: 'number',
    },
    {
      name: 'attack',
      label: 'Attack',
      type: 'group',
      fields: [
        {
          name: 'physical',
          label: 'Physical Damage',
          type: 'number',
        },
        {
          name: 'magic',
          label: 'Magic Damage',
          type: 'number',
        },
        {
          name: 'fire',
          label: 'Fire Damage',
          type: 'number',
        },
        {
          name: 'lightning',
          label: 'Lightning Damage',
          type: 'number',
        },
        {
          name: 'holy',
          label: 'Holy Damage',
          type: 'number',
        },
        {
          name: 'critical',
          label: 'Critical Damage',
          type: 'number',
        },
      ]
    },
    {
      name: 'defense',
      label: 'Defense',
      type: 'group',
      fields: [
        {
          name: 'physical',
          label: 'Physical Damage',
          type: 'number',
        },
        {
          name: 'magic',
          label: 'Magic Damage',
          type: 'number',
        },
        {
          name: 'fire',
          label: 'Fire Damage',
          type: 'number',
        },
        {
          name: 'lightning',
          label: 'Lightning Damage',
          type: 'number',
        },
        {
          name: 'holy',
          label: 'Holy Damage',
          type: 'number',
        },
        {
          name: 'boost',
          label: 'Boost',
          type: 'number',
        },
      ]
    },
    {
      name: 'scaling',
      label: 'Scaling',
      type: 'array',
      admin: {
        position: 'sidebar'
      },
      fields: [
        {
          name: 'statistic',
          label: 'Statistic',
          type: 'relationship',
          relationTo: 'er-statistics',
          required: true,
        },
        {
          name: 'letter',
          label: 'Scaling Letter',
          type: 'select',
          options: [
            'S',
            'A',
            'B',
            'C',
            'D',
            'E'
          ],
          required: true,
        },
      ]
    },
    {
      name: 'requirements',
      label: 'Requirements',
      type: 'array',
      admin: {
        position: 'sidebar'
      },
      fields: [
        {
          name: 'statistic',
          label: 'Statistic',
          type: 'relationship',
          relationTo: 'er-statistics',
          required: true,
        },
        {
          name: 'value',
          label: 'Minimum Value',
          type: 'number',
          required: true,
        },
      ]
    },
  ],
}

export default ERWeapons
