import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { UserInfo } from 'shared/entities'

interface StudentCardProps {
  student: UserInfo
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant='h5'
          component='div'
        >
          {student.firstName} {student.lastName}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        ></Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        ></Typography>
      </CardContent>
    </Card>
  )
}

export default StudentCard
