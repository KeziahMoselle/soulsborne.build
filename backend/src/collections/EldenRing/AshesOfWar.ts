import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'

const ERAshesOfWar: CollectionConfig = {
  slug: 'er-ashes-of-war',
  labels: {
    singular: 'Ash of War',
    plural: 'Ashes of War',
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
      name: 'skill',
      label: 'Skill',
      type: 'relationship',
      relationTo: 'er-skills',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'richText'
    },
    {
      name: 'location',
      label: 'Location',
      type: 'richText'
    },
    {
      name: 'availability',
      label: 'Availability',
      type: 'relationship',
      relationTo: 'er-weapon-types',
      hasMany: true
    },
    {
      name: 'affinity',
      type: 'relationship',
      relationTo: 'er-affinities'
    }
  ],
}

export default ERAshesOfWar
