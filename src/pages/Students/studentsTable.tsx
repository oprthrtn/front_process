import React from 'react'
import { Table, Spin } from 'antd'
import { UserInfo } from 'shared/entities'
import { PaginationConfig } from 'antd/es/pagination'
import { TablePaginationConfig } from 'antd'

const StudentsTable: React.FC<{
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
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    { title: 'Middle Name', dataIndex: 'middleName', key: 'middleName' },
    { title: 'Group Number', dataIndex: 'groupNumber', key: 'groupNumber' },
    { title: 'Stream Number', dataIndex: 'streamNumber', key: 'streamNumber' },
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
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

export default StudentsTable
