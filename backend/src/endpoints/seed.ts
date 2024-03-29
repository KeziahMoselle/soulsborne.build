import type { PayloadHandler } from 'payload/config'

import type { ErWeapon } from '../payload-types'

const STATS = [
  {
    name: 'Vigor',
    softcaps: [
      {
        level: 40,
      },
      {
        level: 60,
      }
    ]
  },
  {
    name: 'Mind',
    softcaps: [
      {
        level: 50,
      },
      {
        level: 60,
      }
    ]
  },
  {
    name: 'Endurance',
    softcaps: [
      {
        level: 15,
      },
      {
        level: 30,
      },
      {
        level: 50,
      }
    ]
  },
  {
    name: 'Strength',
    softcaps: [
      {
        level: 18,
      },
      {
        level: 50,
      },
      {
        level: 60,
      },
      {
        level: 80,
      },
    ]
  },
  {
    name: 'Dexterity',
    softcaps: [
      {
        level: 18,
      },
      {
        level: 50,
      },
      {
        level: 60,
      },
      {
        level: 80,
      }
    ]
  },
  {
    name: 'Arcane',
    softcaps: [
      {
        level: 20,
      },
      {
        level: 60,
      },
      {
        level: 80,
      }
    ]
  },
  {
    name: 'Faith',
    softcaps: [
      {
        level: 60,
      },
      {
        level: 80,
      }
    ]
  },
  {
    name: 'Intelligence',
    softcaps: [
      {
        level: 60,
      },
      {
        level: 80,
      }
    ]
  },
]

const WEAPON_TYPES = [
  'Daggers',
  'Straight Swords',
  'Greatswords',
  'Colossal Swords',
  'Thrusting Swords',
  'Heavy Thrusting Swords',
  'Curved Swords',
  'Curved Greatswords',
  'Katanas',
  'Twinblades',
  'Axes',
  'Greataxes',
  'Hammers',
  'Flails',
  'Great Hammers',
  'Colossal Weapons',
  'Spears',
  'Great Spears',
  'Halberds',
  'Reapers',
  'Whips',
  'Fists',
  'Claws',
  'Light Bows',
  'Bows',
  'Greatbows',
  'Crossbows',
  'Ballistas',
  'Glintstone Staffs',
  'Sacred Seals',
  'Torches',
  'Tools'
]

export const seed: PayloadHandler = async (req, res): Promise<void> => {
  const { user, payload } = req

  for (const stat of STATS) {
    await payload.create({
      collection: 'er-statistics',
      data: {
        name: stat.name,
        softcaps: stat.softcaps
      }
    })
  }

  for (const type of WEAPON_TYPES) {
    await payload.create({
      collection: 'er-weapon-types',
      data: {
        name: type
      }
    })
  }

  const { docs: statistics } = await payload.find({
    collection: 'er-statistics',
    limit: 100,
  })

  const { docs: weaponTypes } = await payload.find({
    collection: 'er-weapon-types',
    limit: 100,
  })

  const STAT_LINK = {
    'Str': statistics.find((stat) => stat.name === 'Strength'),
    'Dex': statistics.find((stat) => stat.name === 'Dexterity'),
    'Arc': statistics.find((stat) => stat.name === 'Arcane'),
    'Fai': statistics.find((stat) => stat.name === 'Faith'),
    'Int': statistics.find((stat) => stat.name === 'Intelligence'),
  }

  const { data: first } = await fetch('https://eldenring.fanapis.com/api/weapons?limit=100').then((response) => response.json())
  const { data: second } = await fetch('https://eldenring.fanapis.com/api/weapons?limit=100&page=2').then((response) => response.json())
  const { data: third } = await fetch('https://eldenring.fanapis.com/api/weapons?limit=100&page=3').then((response) => response.json())

  const items = [...first, ...second, ...third].map((item) => ({
    ...item,
    scalesWith: item.scalesWith.filter((i) => {
      if (STAT_LINK[i.name]) return true;
      return false;
    }),
    requiredAttributes: item.requiredAttributes.filter((i) => {
      if (STAT_LINK[i.name]) return true;
      return false;
    }),
    category: item.category !== 'Warhammer' ? item.category : 'Great Hammers'
  }));

  const formattedItems = items.map((item) => {
    const trueWeaponType = weaponTypes.find((type) => type.name.includes(item.category))

    const attackValues = item.attack.reduce((acc, curr) => {
      acc[curr.name] = curr.amount
      return acc
    }, {});

    const defenseValues = item.defence.reduce((acc, curr) => {
      acc[curr.name] = curr.amount
      return acc
    }, {});

    if (!trueWeaponType) {
      console.log(item)
      throw new Error('Cannot find weapon type')
    }

    const a: Partial<ErWeapon> = {
      name: item.name,
      description: item.description,
      weight: item.weight,
      scaling: item.scalesWith.map((stat) => {
        const trueStat = STAT_LINK[stat.name]

        if (!trueStat) {
          console.log(stat, item)
          throw new Error('Cannot find stat')
        }

        if (!stat.scaling || stat.scaling.includes('?')) {
          console.warn('Need checking: ', item.name)
        }

        return {
          statistic: trueStat.id,
          letter: stat.scaling ? stat.scaling?.replace('?', 'TODO') : 'TODO',
        }
      }),
      weapon_type: trueWeaponType.id,
      attack: {
        physical: attackValues['Phy'],
        magic: attackValues['Mag'],
        fire: attackValues['Fire'],
        lightning: attackValues['Ligt'],
        holy: attackValues['Holy'],
        critical: attackValues['Crit'],
      },
      defense: {
        physical: defenseValues['Phy'],
        magic: defenseValues['Mag'],
        fire: defenseValues['Fire'],
        lightning: defenseValues['Ligt'],
        holy: defenseValues['Holy'],
        boost: defenseValues['Boost'],
      },
      requirements: item.requiredAttributes.map((i) => {
        const trueStat = STAT_LINK[i.name]

        if (!trueStat) {
          console.log(i, item)
          throw new Error('Cannot find stat')
        }

        return {
          statistic: trueStat.id,
          value: i.amount,
        }
      })
    }
    return a
  })


  await Promise.all(formattedItems.map((i) => payload.create({
    collection: 'er-weapons',
    data: i,
  })))

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    res.json({ success: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    payload.logger.error(message)
    res.json({ error: message })
  }
}