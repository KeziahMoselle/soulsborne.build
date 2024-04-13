import type { PayloadHandler } from 'payload/config'

import type { ErAmmunition, ErArmor, ErAshesOfWar, ErClass, ErIncantation, ErShield, ErSorcery, ErTalisman, ErWeapon } from '@payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

function fetchJSON(url) {
  return fetch(url).then((res) => res.json())
}
function getLexicalContent(type: 'quote' | 'paragraph', quote: string) {
  const direction: 'ltr' = "ltr"
  return {
    "root": {
      "type": "root",
      "format": "",
      "indent": 0,
      "version": 1,
      "children": [
        {
          "type": type,
          "format": "",
          "indent": 0,
          "version": 1,
          "children": [
            {
              "mode": "normal",
              "text": quote,
              "type": "text",
              "style": "",
              "detail": 0,
              "format": 0,
              "version": 1
            }
          ],
          "direction": "ltr"
        },
      ],
      "direction": direction
    }
  }
}

const ARCHETYPES = [
  {
    name: 'Melee',
  },
  {
    name: 'Magic',
  },
  {
    name: 'Ranged'
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

const STATUS_EFFECTS = [
  {
    name: 'Poison',
  },
  {
    name: 'Scarlet Rot',
  },
  {
    name: 'Blood Loss',
  },
  {
    name: 'Frostbite',
  },
  {
    name: 'Sleep',
  },
  {
    name: 'Madness',
  },
  {
    name: 'Death Blight',
  },
]

const AFFINITIES: {
  name: string;
  type: 'Physical' | 'Magic' | 'Flame' | 'Golden' | 'Occult'
}[] = [
  {
    name: 'Standard',
    type: 'Physical'
  },
  {
    name: 'Heavy',
    type: 'Physical'
  },
  {
    name: 'Keen',
    type: 'Physical'
  },
  {
    name: 'Quality',
    type: 'Physical'
  },
  {
    name: 'Magic',
    type: 'Magic'
  },
  {
    name: 'Cold',
    type: 'Magic'
  },
  {
    name: 'Fire',
    type: 'Flame'
  },
  {
    name: 'Flame Art',
    type: 'Flame'
  },
  {
    name: 'Lightning',
    type: 'Golden'
  },
  {
    name: 'Sacred',
    type: 'Golden'
  },
  {
    name: 'Poison',
    type: 'Occult'
  },
  {
    name: 'Blood',
    type: 'Occult'
  },
  {
    name: 'Occult',
    type: 'Occult'
  },
]

export const GET = async (req) => {
  const { user } = req

  const payload = await getPayload({
    config: configPromise,
  })

  if (
    process.env.NODE_ENV === 'production'
    && (!user || !user.roles.includes('admin'))) {
    return Response.json({ error: 'Unauthorized' })
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

    for (const status of STATUS_EFFECTS) {
      await payload.create({
        collection: 'er-status-effects',
        data: {
          name: status.name
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    for (const affinity of AFFINITIES) {
      await payload.create({
        collection: 'er-affinities',
        data: {
          name: affinity.name,
          type: affinity.type
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

    const { docs: affinities } = await payload.find({
      collection: 'er-affinities',
      limit: 100,
    })

    const STAT_LINK = {
      'Vig': statistics.find((stat) => stat.name === 'Vigor'),
      'Mind': statistics.find((stat) => stat.name === 'Mind'),
      'Endurance': statistics.find((stat) => stat.name === 'Endurance'),
      'Str': statistics.find((stat) => stat.name === 'Strength'),
      'Dex': statistics.find((stat) => stat.name === 'Dexterity'),
      'Arc': statistics.find((stat) => stat.name === 'Arcane'),
      'Fai': statistics.find((stat) => stat.name === 'Faith'),
      'Int': statistics.find((stat) => stat.name === 'Intelligence'),
    }

    const AFFINITIES_LINK = {
      'Standard': affinities.find((stat) => stat.name === 'Standard'),
      'Heavy': affinities.find((stat) => stat.name === 'Heavy'),
      'Keen': affinities.find((stat) => stat.name === 'Keen'),
      'Quality': affinities.find((stat) => stat.name === 'Quality'),
      'Magic': affinities.find((stat) => stat.name === 'Magic'),
      'Cold': affinities.find((stat) => stat.name === 'Cold'),
      'Fire': affinities.find((stat) => stat.name === 'Fire'),
      'Flame Art': affinities.find((stat) => stat.name === 'Flame Art'),
      'Lightning': affinities.find((stat) => stat.name === 'Lightning'),
      'Sacred': affinities.find((stat) => stat.name === 'Sacred'),
      'Poison': affinities.find((stat) => stat.name === 'Poison'),
      'Blood': affinities.find((stat) => stat.name === 'Blood'),
      'Occult': affinities.find((stat) => stat.name === 'Occult'),
    }

    const [first, second, third] = await Promise.all([
      fetchJSON('https://eldenring.fanapis.com/api/weapons?limit=100'),
      fetchJSON('https://eldenring.fanapis.com/api/weapons?limit=100&page=2'),
      fetchJSON('https://eldenring.fanapis.com/api/weapons?limit=100&page=3')
    ])

    const wItems = [...first.data, ...second.data, ...third.data].map((item) => ({
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

    const wformattedItems = wItems.map((item) => {
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
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
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


    await Promise.all(wformattedItems.map((i) => payload.create({
      collection: 'er-weapons',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const shieldsData = await fetchJSON(' https://eldenring.fanapis.com/api/shields?limit=100')

    const shieldsItems = shieldsData.data.map((item) => ({
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

    const formattedShieldsItems = shieldsItems.map((item) => {
      const SHIELDS_TYPE = {
        'Small Shield': 'Small Shield',
        'Small Shields': 'Small Shield',
        'Medium Shield': 'Medium Shield',
        'Greatshield': 'Greatshield',
        null: 'Small Shield'
      }

      const attackValues = item.attack.reduce((acc, curr) => {
        acc[curr.name] = curr.amount
        return acc
      }, {});

      const defenseValues = item.defence.reduce((acc, curr) => {
        acc[curr.name] = curr.amount
        return acc
      }, {});

      const a: Partial<ErShield> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
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
        shield_type: SHIELDS_TYPE[item.category],
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


    await Promise.all(formattedShieldsItems.map((i) => payload.create({
      collection: 'er-shields',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const [aOne, aTwo, aThree, aFour, aFive] = await Promise.all([
      fetchJSON('https://eldenring.fanapis.com/api/armors?limit=100'),
      fetchJSON('https://eldenring.fanapis.com/api/armors?limit=100&page=2'),
      fetchJSON('https://eldenring.fanapis.com/api/armors?limit=100&page=3'),
      fetchJSON('https://eldenring.fanapis.com/api/armors?limit=100&page=4'),
      fetchJSON('https://eldenring.fanapis.com/api/armors?limit=100&page=5'),
    ])

    const aItems = [
      ...aOne.data,
      ...aTwo.data,
      ...aThree.data,
      ...aFour.data,
      ...aFive.data
    ]

    const aFormattedItems = aItems.map((item) => {
      const ARMOR_CATEGORY = {
        'Helm': 'Helm',
        'Chest Armor': 'Chest',
        'Gauntlets': 'Gauntlet',
        'Leg Armor': 'Leg',
      }

      const a: Partial<ErArmor> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
        weight: item.weight,
        damage_negation: {
          vs_pierce: item.dmgNegation.find((i) => i.name === 'Pierce')?.amount || 0,
          vs_slash: item.dmgNegation.find((i) => i.name === 'Slash')?.amount || 0,
          vs_strike: item.dmgNegation.find((i) => i.name === 'Strike')?.amount || 0,
          fire: item.dmgNegation.find((i) => i.name === 'Fire')?.amount || 0,
          holy: item.dmgNegation.find((i) => i.name === 'Holy')?.amount || 0,
          magic: item.dmgNegation.find((i) => i.name === 'Magic')?.amount || 0,
          lightning: item.dmgNegation.find((i) => i.name === 'Ligt')?.amount || 0,
          physical: item.dmgNegation.find((i) => i.name === 'Phy')?.amount || 0,
        },
        resistance: {
          focus: item.resistance.find((i) => i.name === 'Focus')?.amount || 0,
          immunity: item.resistance.find((i) => i.name === 'Immunity')?.amount || 0,
          poise: item.resistance.find((i) => i.name === 'Poise')?.amount || 0,
          robustness: item.resistance.find((i) => i.name === 'Robustness')?.amount || 0,
          vitality: item.resistance.find((i) => i.name === 'Vitality')?.amount || 0,
        },
        armor_type: ARMOR_CATEGORY[item.category],
      }

      return a
    })


    await Promise.all(aFormattedItems.map((i) => payload.create({
      collection: 'er-armors',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const ammos = await fetchJSON('https://eldenring.fanapis.com/api/ammos?limit=100')

    const ammunitionsFormattedItems = ammos.data.map((item) => {
      const a: Partial<ErAmmunition> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
        attack: {
          physical: item.attackPower.find((i) => i.name === 'physical')?.amount || 0,
          magic: item.attackPower.find((i) => i.name === 'magic')?.amount || 0,
          fire: item.attackPower.find((i) => i.name === 'fire')?.amount || 0,
          lightning: item.attackPower.find((i) => i.name === 'lightning')?.amount || 0,
          holy: item.attackPower.find((i) => i.name === 'holy')?.amount || 0,
          critical: item.attackPower.find((i) => i.name === 'critical')?.amount || 0,
        },
      }
      return a
    })

    await Promise.all(ammunitionsFormattedItems.map((i) => payload.create({
      collection: 'er-ammunitions',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const talismans = await fetchJSON('https://eldenring.fanapis.com/api/talismans?limit=100')

    const talismansFormattedItems = talismans.data.map((item) => {
      const a: Partial<ErTalisman> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
        // @ts-ignore
        effect: getLexicalContent('paragraph', item.effect),
      }
      return a
    })

    await Promise.all(talismansFormattedItems.map((i) => payload.create({
      collection: 'er-talismans',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const sorceries = await fetchJSON('https://eldenring.fanapis.com/api/sorceries?limit=100')

    const sorceriesFormattedItems = sorceries.data.map((item) => {
      const a: Partial<ErSorcery> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
        // @ts-ignore
        effect: getLexicalContent('paragraph', item.effect),
        requirements: [
          {
            statistic: STAT_LINK['Int'].id,
            value: item.requires.find((i) => i.name === 'Intelligence')?.amount || 0,
          },
          {
            statistic: STAT_LINK['Fai'].id,
            value: item.requires.find((i) => i.name === 'Faith')?.amount || 0,
          },
          {
            statistic: STAT_LINK['Arc'].id,
            value: item.requires.find((i) => i.name === 'Arcane')?.amount || 0,
          },
        ],
        slots: item.slots,
        cost: item.cost
      }
      return a
    })

    await Promise.all(sorceriesFormattedItems.map((i) => payload.create({
      collection: 'er-sorceries',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const incantations = await fetchJSON('https://eldenring.fanapis.com/api/incantations?limit=100')

    const incantationsFormattedItems = incantations.data.map((item) => {
      const a: Partial<ErIncantation> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
        // @ts-ignore
        effect: getLexicalContent('paragraph', item.effect),
        requirements: [
          {
            statistic: STAT_LINK['Int'].id,
            value: item?.requires?.find((i) => i.name === 'Intelligence')?.amount || 0,
          },
          {
            statistic: STAT_LINK['Fai'].id,
            value: item?.requires?.find((i) => i.name === 'Faith')?.amount || 0,
          },
          {
            statistic: STAT_LINK['Arc'].id,
            value: item?.requires?.find((i) => i.name === 'Arcane')?.amount || 0,
          },
        ],
        slots: item.slots,
        cost: item.cost
      }
      return a
    })

    await Promise.all(incantationsFormattedItems.map((i) => payload.create({
      collection: 'er-incantations',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const ashes = await fetchJSON('https://eldenring.fanapis.com/api/ashes?limit=100')

    const uniqueSkills = new Set<string>()
    ashes.data.forEach((ash) => uniqueSkills.add(ash.skill))

    for (const skill of Array.from(uniqueSkills).filter(Boolean)) {
      await payload.create({
        collection: 'er-skills',
        data: {
          name: skill,
        }
      }).catch(() => {
        // Silence is golden
      })
    }

    const { docs: allSkills } = await payload.find({
      collection: 'er-skills',
      limit: 100,
    })

    const ashesFormattedItems = ashes.data.map((item) => {
      const linkedAffinity = AFFINITIES_LINK[item.affinity]

      const a: Partial<ErAshesOfWar> = {
        name: item.name,
        // @ts-ignore
        description: getLexicalContent('quote', item.description),
        affinity: linkedAffinity ? linkedAffinity?.id : undefined,
        skill: allSkills.find((skill) => skill.name === item.skill)?.id,
      }
      return a
    })

    await Promise.all(ashesFormattedItems.map((i) => payload.create({
      collection: 'er-ashes-of-war',
      data: i,
    }).catch((e) => {
      // silence is golden
    })))

    const CLASSES: Partial<ErClass>[] = [
      {
        name: 'Hero',
        rune_level: 7,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 14,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 16,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 7,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 8,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 11,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Bandit',
        rune_level: 5,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 13,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 8,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 14,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Astrologer',
        rune_level: 6,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 15,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 8,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 16,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 7,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 9,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Warrior',
        rune_level: 8,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 16,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 8,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 9,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Prisoner',
        rune_level: 9,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 14,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 14,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 6,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 9,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Confessor',
        rune_level: 10,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 13,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 14,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 9,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Wretch',
        rune_level: 1,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 10,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Vagabond',
        rune_level: 9,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 15,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 14,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 13,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 7,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Prophet',
        rune_level: 7,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 14,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 8,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 10,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 7,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 16,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 10,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
      {
        name: 'Samurai',
        rune_level: 9,
        statistics: [
          {
            stat: STAT_LINK['Vig'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Mind'].id,
            value: 11,
          },
          {
            stat: STAT_LINK['Endurance'].id,
            value: 13,
          },
          {
            stat: STAT_LINK['Str'].id,
            value: 12,
          },
          {
            stat: STAT_LINK['Dex'].id,
            value: 15,
          },
          {
            stat: STAT_LINK['Int'].id,
            value: 9,
          },
          {
            stat: STAT_LINK['Fai'].id,
            value: 8,
          },
          {
            stat: STAT_LINK['Arc'].id,
            value: 8,
          },
        ],
        weapons: [
        ],
        shields: [],
        sorceries: [],
        incantations: [],
        ammunitions: [],
      },
    ]

    for (const erClass of CLASSES) {
      await payload.create({
        collection: 'er-classes',
        data: erClass
      })
    }

    return Response.json({ success: true })
  } catch (error) {
    console.log(error)
    const message = error instanceof Error ? error.message : 'Unknown error'
    // @ts-ignore
    payload.logger.error(`${message} ${error?.data?.map((e) => e.message).join(', ')}`)
    return Response.json({
      error: message,
      // @ts-ignore
      message: error?.data?.map((e) => e.message).join(', ')
    })
  }
}