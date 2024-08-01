export interface StudentsResponse {
  data: Student[]
  pagination: Pagination
}

export interface Student {
  _id?: string
  name: string
  last_name: string
  email: string
  age: number
  grade: string
  __v?: number
}

export interface Pagination {
  totalElements: number
  hasNextPage: boolean
  nextPage: number
  previousPage: null
  lastPage: number
}
