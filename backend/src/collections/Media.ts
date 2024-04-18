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
    adminThumbnail: ({ doc }) => `https://cdn.soulsborne.build/media/${doc.filename}`,
    staticDir: 'media',
    disableLocalStorage: true,
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