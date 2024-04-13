import type { User } from "@payload-types"

export interface PayloadCollection<CollectionType> {
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  docs: CollectionType[]
  prevPage: number | null
  nextPage: number | null
}

export interface PayloadCreateResponse<CollectionType> {
  message: string;
  doc: CollectionType;
}

export interface PayloadUserResponse {
  user: User
  collection: string
  token: string
  exp: string
}

export interface PayloadOptionLike {
  id: number | string;
  name: string;
  image?: PayloadMedia | null
}

export interface PayloadMediaResponse {
  doc:     PayloadMedia;
  message: string;
}

export interface PayloadMedia {
  id:           number;
  alt:          null;
  updatedAt:    Date;
  createdAt:    Date;
  url:          string;
  thumbnailURL: string;
  filename:     string;
  mimeType:     string;
  filesize:     number;
  width:        number;
  height:       number;
}