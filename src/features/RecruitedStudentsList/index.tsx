import { Box, Card, CardContent, Grid, List, ListItem, ListItemText } from '@mui/material'
import { Typography } from 'antd'
import { useMemo, useState } from 'react'

import { useInternshipsQuery, useUserIdByTokenQuery, useUserInfoByIdQuery } from 'shared/api'
import { InternshipStatus, Internship } from 'shared/entities/Internship'

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
        middleName: string
        status: InternshipStatus
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
    <>
      <h1>Набранные студенты</h1>
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
              ?.filter(val => val.status === InternshipStatus.OFFER_ACCEPTED)
              .map(student => (
                <Card sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography.Title level={2}>
                      {student.lastName} {student.firstName} {student.middleName}
                    </Typography.Title>
                    <Typography>{student.internships[0]?.vacancyName}</Typography>
                    <Typography></Typography>
                  </CardContent>
                </Card>
              ))}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default StudentList
