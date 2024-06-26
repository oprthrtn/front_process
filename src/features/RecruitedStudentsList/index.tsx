import { Typography } from 'antd'
import { Box, Container, Grid } from '@mui/material'
import { useState } from 'react'
import GroupSideBar from 'widgets/GroupSideBar'
import StudentCard from 'widgets/RecruitedStudentCard'

const students = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    vacancy: 'Фронтенд-разработчик',
    skills: 'React, Typescript, Redux',
    status: 'active' as const, // укажите тип явно
  },
  {
    id: 2,
    name: 'Иванов Иван Иванович',
    vacancy: 'Фронтенд-разработчик',
    skills: 'Vue.js, Typescript',
    status: 'inactive' as const, // укажите тип явно
  },
]

const StudentList = () => {
  const [selectedYear, setSelectedYear] = useState('2021-2022 (9720P)')

  return (
    <Container>
      <Typography.Title level={1}>Набранные студенты</Typography.Title>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={3}
        >
          <GroupSideBar
            selectedYear={selectedYear}
            onSelectYear={setSelectedYear}
          />
        </Grid>
        <Grid
          item
          xs={9}
        >
          <Box>
            {students.map(student => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StudentList
