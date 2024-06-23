import { ReactNode } from 'react'
import { useUserRoleByTokenQuery } from 'shared/api'
import { UserRole } from 'shared/entities'

type WithRoleProps = {
  student?: ReactNode
  company?: ReactNode
  dean?: ReactNode
}
export const WithRole = ({ student, company, dean }: WithRoleProps) => {
  const { data } = useUserRoleByTokenQuery()

  if (!data) {
    return null
  }

  if (data.roles.includes(UserRole.STUDENT)) {
    return student
  }
  if (data.roles.includes(UserRole.COMPANY)) {
    return company
  }
  if (data.roles.includes(UserRole.DEANERY)) {
    return dean
  }

  return null
}
