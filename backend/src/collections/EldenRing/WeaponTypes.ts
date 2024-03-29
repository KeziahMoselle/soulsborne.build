import { CollectionConfig } from 'payload/types'

const ERWeaponTypes: CollectionConfig = {
  slug: 'er-weapon-types',
  labels: {
    singular: 'Weapon Type',
    plural: 'Weapon Types',
  },
  admin: {
    group: 'Elden Ring',
    useAsTitle: 'name',
  },
  fields: [
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
  ],
}

export default ERWeaponTypes
