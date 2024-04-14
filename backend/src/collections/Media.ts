import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic';

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Medias',
  },
  access: {
    read: isPublic
  },
  upload: {
    staticDir: 'media',
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => `https://cdn.soulsborne.build/${doc.filename}`,
    mimeTypes: ['image/*', 'audio/*', 'video/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default Media;