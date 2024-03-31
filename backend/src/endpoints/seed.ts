import type { PayloadHandler } from 'payload/config'

import type { ErWeapon } from '../payload-types'

function fetchJSON(url) {
  return fetch(url).then((res) => res.json())
}

const ARCHETYPES = [
  {
    name: 'Melee',
  },
  {
    name: 'Magic',
  },
  {
    name: 'Sorceries',
  },
  {
    name: 'Incantations',
  },
]

const RESTRICTIONS = [
  {
    name: 'SL1',
  },
  {
    name: 'RL1',
  },
  {
    name: 'PvP',
  },
  {
    name: 'Speedrun',
  },
  {
    name: 'Low HP',
  },
  {
    name: 'Full HP',
  },
]

const INCANTATIONS_TYPES = [
  {
    name: 'Bestical',
  },
  {
    name: 'Blood',
  },
  {
    name: 'Dragon Communion',
  },
  {
    name: 'Dragon Cult',
  },
  {
    name: 'Erdtree',
  },
  {
    name: 'Fire Giant',
  },
  {
    name: 'Fire Monk',
  },
  {
    name: 'Frenzied Flame',
  },
  {
    name: 'Godskin Apostle',
  },
  {
    name: 'Golden Order',
  },
  {
    name: 'Servants of Rot',
  },
  {
    name: 'Two Fingers',
  },
  {
    name: 'Unique',
  },
]

const SORCERIES_TYPES = [
  {
    name: 'Aberrant',
  },
  {
    name: 'Carian',
  },
  {
    name: 'Claymen',
  },
  {
    name: 'Cold',
  },
  {
    name: 'Crystalian',
  },
  {
    name: 'Death',
  },
  {
    name: 'Full Moon',
  },
  {
    name: 'Glintstone',
  },
  {
    name: 'Gravity',
  },
  {
    name: 'Loretta',
  },
  {
    name: 'Magma',
  },
  {
    name: 'Night',
  },
  {
    name: 'Primeval',
  },
]

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

  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    for (const type of INCANTATIONS_TYPES) {
      await payload.create({
        collection: 'er-incantation-types',
        data: {
          name: type.name,
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    for (const type of SORCERIES_TYPES) {
      await payload.create({
        collection: 'er-sorcery-types',
        data: {
          name: type.name,
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    for (const archetype of ARCHETYPES) {
      await payload.create({
        collection: 'archetypes',
        data: {
          name: archetype.name,
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    for (const restriction of RESTRICTIONS) {
      await payload.create({
        collection: 'restrictions',
        data: {
          name: restriction.name,
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    for (const stat of STATS) {
      await payload.create({
        collection: 'er-statistics',
        data: {
          name: stat.name,
          softcaps: stat.softcaps
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    for (const type of WEAPON_TYPES) {
      await payload.create({
        collection: 'er-weapon-types',
        data: {
          name: type
        }
      }).catch(() => {
        // Silence is golden
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

    /**
     * Weapons
     */
    const [first, second, third] = await Promise.all([
      fetchJSON('https://eldenring.fanapis.com/api/weapons?limit=100'),
      fetchJSON('https://eldenring.fanapis.com/api/weapons?limit=100&page=2'),
      fetchJSON('https://eldenring.fanapis.com/api/weapons?limit=100&page=3')
    ])

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
    }).catch((e) => {
      // silence is golden
    })))

    res.json({ success: true })
  } catch (error: unknown) {
    console.log(error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    // @ts-ignore
    payload.logger.error(`${message} ${error?.data?.map((e) => e.message).join(', ')}`)
    res.json({
      error: message,
      // @ts-ignore
      message: error?.data?.map((e) => e.message).join(', ')
    })
  }
}