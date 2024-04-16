export const FORM = [
  [
    {
      name: 'mainhand-1',
      type: 'mainhand',
      relationTo: ['er-weapons'],
    },
    {
      name: 'mainhand-2',
      type: 'mainhand',
      relationTo: ['er-weapons'],
    },
    {
      name: 'mainhand-3',
      type: 'mainhand',
      relationTo: ['er-weapons'],
    },
    {
      name: 'bolt-1',
      type: 'bolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Bolt'
            }
          } */
        },
      ],
    },
    {
      name: 'bolt-2',
      type: 'bolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Bolt'
            }
          } */
        },
      ],
    },
  ],
  [
    {
      name: 'offhand-1',
      type: 'offhand',
      relationTo: ['er-weapons', 'er-shields'],
    },
    {
      name: 'offhand-2',
      type: 'offhand',
      relationTo: ['er-weapons', 'er-shields'],
    },
    {
      name: 'offhand-3',
      type: 'offhand',
      relationTo: ['er-weapons', 'er-shields'],
    },
    {
      name: 'greatbolt-1',
      type: 'greatbolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Greatbolt'
            }
          } */
        },
      ],
    },
    {
      name: 'greatbolt-2',
      type: 'greatbolt',
      relationTo: [
        {
          slug: 'er-ammunitions',
          /* query: {
            ammunition_type: {
              equals: 'Greatbolt'
            }
          } */
        },
      ],
    },
  ],
  [
    {
      name: 'helm',
      type: 'helm',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Helm',
            },
          },
        },
      ],
    },
    {
      name: 'chest',
      type: 'chest',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Chest',
            },
          },
        },
      ],
    },
    {
      name: 'gauntlet',
      type: 'gauntlet',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Gauntlet',
            },
          },
        },
      ],
    },
    {
      name: 'leg',
      type: 'leg',
      relationTo: [
        {
          slug: 'er-armors',
          query: {
            armor_type: {
              equals: 'Leg',
            },
          },
        },
      ],
    },
  ],
  [
    {
      name: 'talisman-1',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
    {
      name: 'talisman-2',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
    {
      name: 'talisman-3',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
    {
      name: 'talisman-4',
      type: 'talisman',
      relationTo: ['er-talismans'],
    },
  ],
  ...Array.from({ length: 10 }).map((_, id) => ({
    name: `magic-${id + 1}`,
    type: 'magic',
    relationTo: ['er-sorceries', 'er-incantations'],
  })),
]
