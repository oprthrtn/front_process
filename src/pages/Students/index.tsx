import FilterButtons from './filterButtons'
import ActionButtons from './actionButtons'
import StudentsTable from './results'
import SecondaryButtons from './secondaryButtons'
import { Typography } from 'antd'

const Students = () => {
  return (
    <div>
      <Typography.Title level={1}>Студенты</Typography.Title>
      <SecondaryButtons />
      <FilterButtons />
      <ActionButtons />
      <StudentsTable />
      {/* <StudentsPagination /> */}
    </div>
  )
}

export default Students
