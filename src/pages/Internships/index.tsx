import { Button, Empty, Form, Modal, Select, Spin } from 'antd'
import { InternshipCard } from 'entities/Internship'
import { useEffect, useMemo, useState } from 'react'
import {
  useAllUsersQuery,
  useCompaniesQuery,
  useCreateInternshipMutation,
  useLazyCompatInternshipsQuery,
  useUserIdByTokenQuery,
  useVacanicesQuery,
} from 'shared/api'
import { UserRole } from 'shared/entities'
import { InternshipStatus, internshipStatusToStringRecord } from 'shared/entities/Internship'

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
                    label: user.email,
                    value: user.id,
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
        type='primary'
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
  const [getIternships, { data }] = useLazyCompatInternshipsQuery()
  const { data: users } = useAllUsersQuery()
  const { data: userIdData } = useUserIdByTokenQuery()
  const { data: companies } = useCompaniesQuery()

  const companyId = users?.content.find(
    val => val.id === userIdData?.userId && val.roles.includes(UserRole.COMPANY)
  )?.companyId

  const [form] = Form.useForm()
  useEffect(() => {
    if (companyId) {
      getIternships({ companyId: companyId })
    } else {
      getIternships()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])
  if (!data || !userIdData) {
    return null
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Стажировки</h1>
        <CreateNewInternship />
      </div>
      <Form
        layout='vertical'
        style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}
        onFinish={vals => {
          companyId ? getIternships({ ...vals, companyId }) : getIternships({ ...vals })
        }}
        form={form}
      >
        <Form.Item
          name={'companyId'}
          label={'Компания'}
          style={{ width: '250px' }}
        >
          {companyId ? (
            <Select
              disabled={true}
              defaultValue={companyId}
              options={companies?.items.map(val => {
                return {
                  value: val.id,
                  label: val.name,
                }
              })}
            />
          ) : (
            <Select
              options={companies?.items.map(val => {
                return {
                  value: val.id,
                  label: val.name,
                }
              })}
            />
          )}
        </Form.Item>

        <Form.Item
          name={'userId'}
          label={'Пользователь'}
        >
          <Select
            style={{ width: '250px' }}
            options={users?.content.map(user => {
              return {
                label: `${user.lastName} ${user.firstName} ${user.middleName}`,
                value: user.id,
              }
            })}
          />
        </Form.Item>

        <Form.Item
          name={'statuses'}
          label={'Статус'}
        >
          <Select
            style={{ width: '250px' }}
            options={Object.values(InternshipStatus)
              .filter(val => typeof val === 'number')
              .map(val => {
                return {
                  label: internshipStatusToStringRecord[val as InternshipStatus],
                  value: val,
                }
              })}
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType='submit'
            type='primary'
          >
            Применить фильтры
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType='submit'
            danger
            onClick={() => {
              form.resetFields()
            }}
          >
            Сбросить
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', overflow: 'auto' }}>
        {data.items.length ? (
          data.items.map((internship, idx) => {
            return (
              <InternshipCard
                key={idx}
                internship={internship}
                userId={userIdData.userId}
                studentId={internship.userId}
              />
            )
          })
        ) : (
          <Empty />
        )}
      </div>
    </>
  )
}

export default Internships
