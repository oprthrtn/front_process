import { Button, Card, Form, Modal, Select, Spin } from 'antd'
import { useMemo, useState } from 'react'
import { useAllUsersQuery, useCreateInternshipMutation, useInternshipsQuery, useVacanicesQuery } from 'shared/api'

const CreateNewInternship = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { data, isFetching: allUsersIsetching } = useAllUsersQuery()
  const { data: vacancies, isFetching: vacanciesIsFetching } = useVacanicesQuery()
  const [createInternship, { isLoading: createIsLoading }] = useCreateInternshipMutation()

  const isLoading = useMemo(
    () => allUsersIsetching || vacanciesIsFetching || createIsLoading,
    [allUsersIsetching, createIsLoading, vacanciesIsFetching]
  )
  return (
    <>
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false)
        }}
        footer={null}
      >
        <Spin spinning={isLoading}>
          <Form
            layout='vertical'
            onFinish={values => {
              createInternship(values)
            }}
          >
            <Form.Item
              label='Пользователь'
              name={'userId'}
              rules={[{ required: true }]}
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
              rules={[{ required: true }]}
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
              <Button
                htmlType='submit'
                type='primary'
              >
                Создать стажировку
              </Button>
            </Form.Item>
          </Form>
        </Spin>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Стажировки</h1>
        <CreateNewInternship />
      </div>
      {data.items.map(internship => {
        return <Card key={internship.internshipId}></Card>
      })}
    </>
  )
}

export default Internships
