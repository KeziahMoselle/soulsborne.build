import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic';

const SlidersMedia: CollectionConfig = {
  slug: 'sliders-media',
  labels: {
    singular: 'Slider Media',
    plural: 'Sliders Medias',
  },
  access: {
    read: isPublic
  },
  upload: {
    adminThumbnail: ({ doc }) => `https://cdn.soulsborne.build/sliders-media/${doc.filename}`,
    staticDir: 'sliders-media',
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

export default SlidersMedia;