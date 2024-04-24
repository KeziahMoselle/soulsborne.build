import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic';
import { isAdmin } from '@/access/isAdmin';
import { getAdminThumbnail, isLocalStorageDisabled } from '@/utils/isLocalstorageDisabled';

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Medias',
  },
  access: {
    read: isPublic,
    delete: isAdmin,
  },
  upload: {
    adminThumbnail: ({ doc }) => getAdminThumbnail('media/', doc),
    staticDir: 'media',
    disableLocalStorage: isLocalStorageDisabled,
    mimeTypes: ['image/*', 'audio/*', 'video/*'],
    imageSizes: [
      {
        name: "16/9",
        width: 1920,
        height: 1080,
        crop: "center",
        withoutEnlargement: true,
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        crop: "center",
        withoutEnlargement: true,
      },
      {
        name: "256",
        width: 256,
        height: 256,
        crop: "center",
        withoutEnlargement: true,
      },
      {
        name: "64",
        width: 64,
        height: 64,
        crop: "center",
        withoutEnlargement: true,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default Media;