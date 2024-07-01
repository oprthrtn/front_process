import { Typography } from 'antd'
import UserInternshipFilters from 'features/InternshipsProgress/Filters'
import StudentsInternshipTable from './studentsTable'
import { useInternshipsQuery } from 'shared/api'
import { useState } from 'react'

function InternshipsProgress() {
  const [filters, setFilters] = useState<string[][]>([])
  const { data, isLoading } = useInternshipsQuery(filters)

  return (
    <>
      <Typography.Title level={1}>Прогресс по стажировкам</Typography.Title>
      <UserInternshipFilters onFinish={(filters: string[][]) => setFilters(filters)} />
      <StudentsInternshipTable
        data={data}
        isLoading={isLoading}
        onChange={() => {}}
      />
    </>
  )
}

export default InternshipsProgress
