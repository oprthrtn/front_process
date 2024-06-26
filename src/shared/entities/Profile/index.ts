import { PaginationConfig } from 'antd/es/pagination'

export enum UserRole {
  STUDENT = 'STUDENT',
  COMPANY = 'COMPANY',
  DEANERY = 'DEANERY',
}

export type UserInfo = {
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
  company: string
  role: string
  pagination: PaginationConfig
}
