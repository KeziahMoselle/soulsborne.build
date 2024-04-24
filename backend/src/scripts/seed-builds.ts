// @ts-nocheck
import { faker } from '@faker-js/faker'
import { getPayload } from 'payload'
import { importConfig } from 'payload/node'
import 'dotenv/config'
import { getLexicalContent } from '@/scripts/seed'

function createRandomLengthIntArray(max) {
  return Array.from({ length: faker.number.int({ min: 1, max: 4 })})
    .map(() => faker.number.int({ min: 1, max }))
}

function createRandomLengthArrayOfObject(propertyName, max) {
  return Array
    .from({ length: faker.number.int({ min: 0, max: 3 })})
    .map(() => ({
      [propertyName]: faker.number.int({ min: 1, max })
    }))
}

function createRandomLengthArrayOfObjectMultipleRelations(propertyName, relationTo, max) {
  return Array
    .from({ length: faker.number.int({ min: 0, max: 3 })})
    .map(() => ({
      [propertyName]: {
        relationTo,
        value: faker.number.int({ min: 1, max })
      }
    }))
}

function createRandomBuild(): ErBuild {
  return {
    name: faker.lorem.word({ length: { min: 1, max: 12 } }),
    // @ts-ignore
    description: getLexicalContent('paragraph', faker.lorem.text()),
    images: createRandomLengthArrayOfObject('image', 3),
    restrictions: createRandomLengthIntArray(4),
    archetypes: createRandomLengthIntArray(4),
    is_two_handed: faker.datatype.boolean(),
    mainhand_weapons: createRandomLengthArrayOfObject('weapon', 100),
    offhand_weapons: createRandomLengthArrayOfObjectMultipleRelations('weapon', 'er-weapons', 100),
    armors: createRandomLengthIntArray(50),
    talismans: createRandomLengthIntArray(10),
    arrows: createRandomLengthIntArray(10),
    bolts: createRandomLengthIntArray(10),
    incantations: createRandomLengthIntArray(30),
    sorceries: createRandomLengthIntArray(30),
    level: faker.number.int({ min: 1, max: 713 }),
    created_by: 1,
    starting_class: faker.number.int({ min: 1, max: 5 }),
    statistics: [
      {
        stat: 1,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 2,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 3,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 4,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 5,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 6,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 7,
        value: faker.number.int({ min: 8, max: 99 })
      },
      {
        stat: 8,
        value: faker.number.int({ min: 8, max: 99 })
      },
    ],
  };
}

async function run() {
  const awaitedConfig = await importConfig('../../payload.config.ts')
  const payload = await getPayload({ config: awaitedConfig })

  try {
    const builds = Array.from({ length: 50 })
      .map(() => createRandomBuild())

    const buildsPromises = builds.map((b) => payload.create({
      collection: 'er-builds',
      data: b
    }).catch(() => {
      // Duplicates
    }))

    await Promise.all(buildsPromises)

    console.log('seeded builds!')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

run()