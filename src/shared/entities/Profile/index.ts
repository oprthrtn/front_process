import { PaginationConfig } from 'antd/es/pagination'

export enum UserRole {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY',
  DEANERY = 'DEANERY',
}
export type Users = {
  content: Array<UserInfo>
  page: number
  size: number
  totalElements: number
  totalPages: number
}

export type UserInfo = {
  companyId: string | null
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  streamNumber: number
  groupNumber: string
  roles: Array<UserRole>
}

export type UserFilters = {
  firstName: string
  lastName: string
  middleName: string
  groupNumber: number
  streamNumber: number
  // company: string
  // role: string
  pagination: PaginationConfig
}
