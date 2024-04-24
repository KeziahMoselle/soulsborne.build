import { CollectionConfig } from 'payload/types'
import { isPublic } from '../access/isPublic';
import { getAdminThumbnail, isLocalStorageDisabled } from '@/utils/isLocalstorageDisabled';

const FashionMedia: CollectionConfig = {
  slug: 'fashion-media',
  labels: {
    singular: 'Fashion Media',
    plural: 'Fashion Medias',
  },
  admin: {
    hidden({ user }) {
      return !user?.roles?.includes('admin')
    },
  },
  access: {
    read: isPublic
  },
  upload: {
    adminThumbnail: ({ doc }) => getAdminThumbnail('fashion-media/', doc),
    staticDir: 'fashion-media',
    disableLocalStorage: isLocalStorageDisabled,
    mimeTypes: ['image/*'],
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
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default FashionMedia;