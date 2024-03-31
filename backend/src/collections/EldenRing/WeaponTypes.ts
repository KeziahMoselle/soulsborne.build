import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

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
  access: {
    read: isPublic
  },
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      unique: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText'
    },
  ],
}

export default ERWeaponTypes
