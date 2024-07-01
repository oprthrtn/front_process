import React from 'react'
import { Table, Spin } from 'antd'
import { TablePaginationConfig } from 'antd'
import { InternshipList } from 'shared/api'
import { internshipStatusToStringRecord } from 'shared/entities/Internship'
import { PROFILE_ROUTE } from 'shared/config'
import { Link } from 'react-router-dom'

type userInternshipDTO = {
  name: string
  userId: string
  streamNumber: number
  groupNumber: string
  status: string
  internships: string
}

function convertInternshipList(data: InternshipList | undefined): Array<userInternshipDTO> {
  if (data === undefined) {
    return []
  }

  return data.items.map(val => {
    return {
      name: val.firstName + ' ' + val.middleName + ' ' + val.lastName,
      userId: val.userId,
      groupNumber: val.groupNumber,
      internships: val.internships.length.toString(),
      status: internshipStatusToStringRecord[val.status],
      streamNumber: val.streamNumber,
    }
  })
}

const getStatusCellClassName = (status: string): string => {
  if (status === 'Без стажировки') {
    return 'no-internship'
  } else if (status === 'Резюме отправлено') {
    return 'cv-sent'
  } else if (status === 'Интервью запланировано') {
    return 'interview-planned'
  } else if (status === 'Интервью пройдено') {
    return 'passed-interview'
  } else if (status === 'Оффер отправлен') {
    return 'has-offer'
  } else if (status === 'Оффер принят') {
    return 'accepted-offer'
  }
  // Add more conditions as needed
  return ''
}

const StudentsInternshipTable: React.FC<{
  data: InternshipList | undefined
  isLoading: boolean
  onChange: (pagination: TablePaginationConfig) => void
}> = ({ data, isLoading, onChange }) => {
  if (isLoading) return <Spin tip='Loading...' />

  const columns = [
    {
      title: 'ФИО',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: userInternshipDTO) => (
        <Link
          to={PROFILE_ROUTE(record.userId)}
          key={record.userId}
        >
          {name}
        </Link>
      ),
    },
    { title: 'Поток', dataIndex: 'streamNumber', key: 'streamNumber' },
    { title: 'Группа', dataIndex: 'groupNumber', key: 'groupNumber' },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <span className={getStatusCellClassName(status)}>{status}</span>,
    },
    { title: 'Стажировки', dataIndex: 'internships', key: 'internships' },
  ]

  return (
    <Table
      dataSource={convertInternshipList(data)}
      columns={columns}
      rowKey='id'
      // pagination={pagination as TablePaginationConfig}
      onChange={onChange}
    />
  )
}

export default StudentsInternshipTable
