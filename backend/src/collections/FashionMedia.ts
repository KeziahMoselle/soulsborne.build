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