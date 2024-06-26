import { useState } from 'react'
import FiltersForm from 'features/students/FilterStudents'
import StudentsTable from './studentsTable'
import AddStudentManuallyForm from 'features/students/AddStudentsManuallyForm'
import ImportCSVStudentsForm from 'features/students/ImportCSVStudentsForm'
import { TablePaginationConfig, Typography, Button } from 'antd'
import { useAllUsersByFiltersQuery } from 'shared/api'
import { UserFilters } from 'shared/entities'
import { PaginationConfig } from 'antd/es/pagination'

const Students = () => {
  const [filters, setFilters] = useState({})
  const [pagination, setPagination] = useState<PaginationConfig>({ current: 1, pageSize: 10 })
  const { data, isLoading } = useAllUsersByFiltersQuery(filters, {
    skip: !filters || Object.keys(filters).length === 0,
  })

  const handleSearch = (values: UserFilters) => {
    setFilters(values)
    setPagination({ current: 1, pageSize: 10 }) // Reset pagination on new search
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination({
      current: pagination.current,
      pageSize: pagination.pageSize,
    })
  }

  return (
    <div>
      <Typography.Title level={1}>Студенты</Typography.Title>
      <AddStudentManuallyForm />
      <ImportCSVStudentsForm />
      <FiltersForm
        onFinish={handleSearch}
        pagination={pagination}
      />
      <Button type='default'>Экспорт в CSV</Button>
      <StudentsTable
        data={data?.content || []}
        isLoading={isLoading}
        // error={error?.}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default Students
