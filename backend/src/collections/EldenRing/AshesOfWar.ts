import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { isAdmin } from '@/access/isAdmin'

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
    read: isPublic,
    delete: isAdmin,
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
    lexicalHTML('description', { name: 'description_html' }),
    {
      name: 'location',
      label: 'Location',
      type: 'richText'
    },
    lexicalHTML('location', { name: 'location_html' }),
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
