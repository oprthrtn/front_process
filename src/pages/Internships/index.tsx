import { Button, Card, Form, Modal, Select } from 'antd'
import { useState } from 'react'
import { useAllUsersQuery, useCreateInternshipMutation, useInternshipsQuery, useVacanicesQuery } from 'shared/api'

const CreateNewInternship = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { data } = useAllUsersQuery()
  const { data: vacancies } = useVacanicesQuery()
  const [createInternship] = useCreateInternshipMutation()
  return (
    <>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        footer={null}
      >
        <Form
          onFinish={values => {
            createInternship(values)
          }}
        >
          <Form.Item
            label='Пользователь'
            name={'userId'}
          >
            <Select
              options={data?.content.map(user => {
                return {
                  label: user.username,
                  value: user.email,
                }
              })}
            />
          </Form.Item>

          <Form.Item
            label='Вакансия'
            name={'vacancyId'}
          >
            <Select
              options={vacancies?.items.map(vacancy => {
                return {
                  label: vacancy.name,
                  value: vacancy.id,
                }
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit'>Создать стажировку</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Создать стажировку
      </Button>
    </>
  )
}
const Internships = () => {
  const { data } = useInternshipsQuery()

  if (!data) {
    return null
  }
  return (
    <>
      <h1>Стажировки</h1>
      <CreateNewInternship />
      {data.items.map(internship => {
        return <Card key={internship.internshipId}></Card>
      })}
    </>
  )
}

export default Internships
