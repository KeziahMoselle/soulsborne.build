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
    staticURL: '/er-media',
    staticDir: 'er-media',
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => `https://pub-3a5ef743ff2748219f5eb6a3adad2be7.r2.dev/${doc.filename}`,
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