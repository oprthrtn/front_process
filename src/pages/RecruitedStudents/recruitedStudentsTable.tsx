import React from 'react'
import { Table, Spin } from 'antd'
import { UserInfo } from 'shared/entities'
import { PaginationConfig } from 'antd/es/pagination'
import { TablePaginationConfig } from 'antd'

const RecruitedStudentsTable: React.FC<{
  data: Array<UserInfo>
  isLoading: boolean
  // error: Error
  pagination: PaginationConfig
  onChange: (pagination: TablePaginationConfig) => void
}> = ({ data, isLoading, pagination, onChange }) => {
  if (isLoading) return <Spin tip='Loading...' />
  // if (error)
  //   return (
  //     <Alert
  //       message='Error'
  //       description={error.message}
  //       type='error'
  //       showIcon
  //     />
  //   )

  const columns = [
    { title: 'Студент', dataIndex: 'student', key: 'student' },
    { title: 'Вакансия', dataIndex: 'vacancy', key: 'vacancy' },
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      rowKey='id'
      pagination={pagination as TablePaginationConfig}
      onChange={onChange}
    />
  )
}

export default RecruitedStudentsTable
