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
