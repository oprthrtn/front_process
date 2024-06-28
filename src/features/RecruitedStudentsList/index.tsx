import { Box, Card, CardContent, Container, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useMemo, useState } from 'react'

import { useInternshipsQuery, useUserIdByTokenQuery, useUserInfoByIdQuery } from 'shared/api'
import { InpernshipStatus, Internship } from 'shared/entities/Internship'

const StudentList = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('')

  const { data: idData } = useUserIdByTokenQuery()
  const id = idData?.userId
  const { data: userInfo } = useUserInfoByIdQuery({ userId: id! }, { skip: !id })
  const companyId = userInfo?.companyId
  const { data: interships } = useInternshipsQuery({ companyId: companyId! }, { skip: !companyId })

  const grouped = useMemo(() => {
    const result: {
      [k: string]: Array<{
        userId: string
        firstName: string
        lastName: string
        status: InpernshipStatus
        internships: Array<Internship>
      }>
    } = {}

    interships?.items.forEach(item => {
      result[item.groupNumber] = Array.isArray(result[item.groupNumber])
        ? [...result[item.groupNumber], { ...item }]
        : [{ ...item }]
    })

    return result
  }, [interships?.items])
  return (
    <Container>
      <Typography variant='h5'>Набранные студенты</Typography>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={3}
        >
          <List>
            {Object.keys(grouped)?.map((number, index) => (
              <ListItem
                key={index}
                button
                selected={number === selectedGroup}
                onClick={() => setSelectedGroup(number)}
                sx={{ color: number === selectedGroup ? 'blue' : 'black' }}
              >
                <ListItemText primary={number} />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid
          item
          xs={9}
        >
          <Box>
            {grouped[selectedGroup]
              ?.filter(val => val.status === InpernshipStatus.OFFER_ACCEPTED)
              .map(student => (
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
                    >
                      {student.internships[0]?.vacancyName}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='text.secondary'
                    ></Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default StudentList
