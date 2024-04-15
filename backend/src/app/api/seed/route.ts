import type { ErBuild } from '@payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { faker } from '@faker-js/faker';

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


function createRandomLengthIntArray(max) {
  return Array.from({ length: faker.number.int({ min: 0, max: 4 })})
    .map(() => faker.number.int({ min: 1, max }))
}

function createRandomLengthArrayOfObject(propertyName, max) {
  return Array
    .from({ length: faker.number.int({ min: 0, max: 4 })})
    .map(() => ({
      [propertyName]: faker.number.int({ min: 1, max })
    }))
}

export function createRandomBuild(): ErBuild {
  return {
    name: faker.company.name(),
    // @ts-ignore
    description: getLexicalContent('paragraph', faker.person.bio()),
    images: [
      {
        image: faker.number.int({ min: 0, max: 5 })
      }
    ],
    restrictions: createRandomLengthIntArray(6),
    archetypes: createRandomLengthIntArray(4),
    is_two_handed: faker.datatype.boolean(),
    mainhand_weapons: createRandomLengthArrayOfObject('weapon', 207)
  };
}

export const GET = async (req) => {
  const payload = await getPayload({
    config: configPromise,
  })

  return Response.json({ success: true })
}