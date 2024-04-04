import type { User } from "~/payload-types"

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

export interface PayloadUserResponse {
  user: User
  collection: string
  token: string
  exp: string
}