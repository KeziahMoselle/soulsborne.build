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
