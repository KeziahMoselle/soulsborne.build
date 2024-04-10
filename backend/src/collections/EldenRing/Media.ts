import { CollectionConfig } from 'payload/types'
import { isPublic } from '../../access/isPublic';

const ERMedia: CollectionConfig = {
  slug: 'er-media',
  labels: {
    singular: 'Media',
    plural: 'Medias',
  },
  admin: {
    group: 'Elden Ring',
  },
  access: {
    read: isPublic
  },
  upload: {
    staticDir: 'er-media',
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

export default ERMedia;