import { Fragment, ReactNode } from 'react'
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

  const result = []
  if (data.roles.includes(UserRole.STUDENT)) {
    result.push(student)
  }
  if (data.roles.includes(UserRole.COMPANY)) {
    result.push(company)
  }
  if (data.roles.includes(UserRole.DEANERY)) {
    result.push(dean)
  }

  return result.map((node, idx) => {
    return <Fragment key={idx}>{node}</Fragment>
  })
}
