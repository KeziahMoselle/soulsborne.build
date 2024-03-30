import { CollectionConfig } from 'payload/types'

const ERMedia: CollectionConfig = {
  slug: 'er-media',
  upload: {
    staticURL: '/er-media',
    staticDir: 'er-media',
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => `https://place-hold.it/300x300`,
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