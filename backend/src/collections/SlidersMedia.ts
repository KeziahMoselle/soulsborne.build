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