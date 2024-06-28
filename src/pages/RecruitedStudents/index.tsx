import { useState } from 'react'
import { ContainerWrappedStyled } from 'features/RecruitedStudentsList/Componets/styled'
import RecruitedStudentsTable from './recruitedStudentsTable'
import { PaginationConfig } from 'antd/es/pagination'
import { useAllUsersByFiltersQuery } from 'shared/api'
import { TablePaginationConfig } from 'antd'

const RecruitedStudents = () => {
  const [filters] = useState({})
  const [pagination, setPagination] = useState<PaginationConfig>({ current: 1, pageSize: 10 })

  const { data, isLoading } = useAllUsersByFiltersQuery(filters, {
    skip: !filters || Object.keys(filters).length === 0,
  })

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  return (
    <ContainerWrappedStyled>
      <RecruitedStudentsTable
        data={data?.content || []}
        isLoading={isLoading}
        // error={error?.}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
        }}
        onChange={handleTableChange}
      />
    </ContainerWrappedStyled>
  )
}

export default RecruitedStudents
