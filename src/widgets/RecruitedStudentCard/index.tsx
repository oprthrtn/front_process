import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

interface Student {
  id: number
  name: string
  vacancy: string
  skills: string
  status: 'active' | 'inactive'
}

interface StudentCardProps {
  student: Student
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography
          variant='h5'
          component='div'
        >
          {student.name}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {student.vacancy}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
        >
          {student.skills}
        </Typography>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <WorkIcon />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {student.status === 'active' ? 'Активный' : 'Неактивный'}
            </Typography>
            {student.status === 'active' ? <CheckCircleIcon color="success" sx={{ ml: 1 }} /> : <CancelIcon color="error" sx={{ ml: 1 }} />}
          </Box> */}
      </CardContent>
    </Card>
  )
}

export default StudentCard
