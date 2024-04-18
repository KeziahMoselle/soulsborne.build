import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic';

const FashionMedia: CollectionConfig = {
  slug: 'fashion-media',
  labels: {
    singular: 'Fashion Media',
    plural: 'Fashion Medias',
  },
  access: {
    read: isPublic
  },
  upload: {
    adminThumbnail: ({ doc }) => `https://cdn.soulsborne.build/fashion-media/${doc.filename}`,
    staticDir: 'fashion-media',
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

export default FashionMedia;