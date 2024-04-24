export const isLocalStorageDisabled = process.env.NODE_ENV === 'production'

export function getAdminThumbnail(prefix: string = '', doc?: any) {
  console.log(process.env.NODE_ENV)
  if (isLocalStorageDisabled) {
    return `${process.env.CDN_URL}/${prefix}${doc.filename}`
  }

  // Does not override adminThumbnail from Payload, thus returning the local file.
  return undefined
}