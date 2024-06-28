import { Button, Card, Form, Input, Modal, Select, Spin, Typography, Upload } from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import {
  useAddDiaryMutation,
  useAllUsersQuery,
  useDiariesQuery,
  useUserIdByTokenQuery,
  useUserInfoByIdQuery,
} from 'shared/api'
import { DIARY_ROUTE } from 'shared/config'
import { Diary, DiaryStatus } from 'shared/entities'

const AddDiariesModal = () => {
  const [openModal, setModalOpen] = useState<boolean>(false)
  const { data: userId, isFetching: userIdIsFetching } = useUserIdByTokenQuery()
  const [addDiary, { isLoading: addDiaryIsLoading }] = useAddDiaryMutation()

  const isLoading = useMemo(() => userIdIsFetching || addDiaryIsLoading, [addDiaryIsLoading, userIdIsFetching])
  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => {
          if (!isLoading) {
            setModalOpen(false)
          }
        }}
        footer={null}
      >
        <Spin spinning={isLoading}>
          <Form
            layout='vertical'
            onFinish={values => {
              const file = values.file.file

              if (file) {
                const formData = new FormData()

                formData.append(
                  'dto',
                  JSON.stringify({
                    userId: userId?.userId,
                    name: values.name,
                    status: values.status,
                  })
                )
                formData.append('file', file)
                addDiary({ formData })
                  .unwrap()
                  .then(() => {
                    setModalOpen(false)
                  })
              }
            }}
          >
            <Form.Item
              name={'name'}
              label={'Название'}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <WithRole
              student={
                <Form.Item
                  name={'status'}
                  label={'Статус'}
                  rules={[{ required: true }]}
                  initialValue={DiaryStatus.IN_QUEUE_FOR_CHECK}
                >
                  <Select
                    disabled
                    options={[
                      { value: DiaryStatus.ACCEPTED, label: 'Принято' },
                      { value: DiaryStatus.IN_QUEUE_FOR_CHECK, label: 'В очереди' },
                      { value: DiaryStatus.NEEDS_IMPROVEMENT, label: 'Требуется улучшение' },
                    ]}
                  />
                </Form.Item>
              }
              dean={
                <Form.Item
                  name={'status'}
                  label={'Статус'}
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { value: DiaryStatus.ACCEPTED, label: 'Принято' },
                      { value: DiaryStatus.IN_QUEUE_FOR_CHECK, label: 'В очереди' },
                      { value: DiaryStatus.NEEDS_IMPROVEMENT, label: 'Требуется улучшение' },
                    ]}
                  />
                </Form.Item>
              }
            />

            <Form.Item
              name={'file'}
              label={'Файл'}
              rules={[{ required: true }]}
            >
              <Upload
                beforeUpload={() => {
                  return false
                }}
              >
                <Button>Выбрать файл</Button>
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
              >
                Добавить
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      <Button
        onClick={() => {
          setModalOpen(true)
        }}
        type='primary'
      >
        Добавить дневник
      </Button>
    </>
  )
}

const DiaryStatusToString: { [k in DiaryStatus]: string } = {
  [DiaryStatus.ACCEPTED]: 'Принято',
  [DiaryStatus.IN_QUEUE_FOR_CHECK]: 'В очереди',
  [DiaryStatus.NEEDS_IMPROVEMENT]: 'Требуется улучшение',
}
const DiaryCard = ({ diary }: { diary: Diary }) => {
  const { data } = useUserInfoByIdQuery({ userId: diary.userId })
  return (
    <Link
      to={DIARY_ROUTE(diary.id)}
      key={diary.id}
    >
      <Card title={diary.name}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>
            <Typography.Text strong>Пользователь: </Typography.Text> {data?.lastName} {data?.firstName}{' '}
            {data?.middleName}
          </span>
          <span>
            <Typography.Text strong>Статус: </Typography.Text> {DiaryStatusToString[diary.status]}
          </span>
          <span>
            <Typography.Text strong>Дата создания: </Typography.Text>{' '}
            {new Date(diary.creationDate).toLocaleString('ru')}
          </span>
        </div>
      </Card>
    </Link>
  )
}
const DeanLayout = ({ data }: { data?: Array<Diary> }) => {
  const { data: users } = useAllUsersQuery()
  const [form] = Form.useForm()
  const [filters, setFilters] = useState<{ userId: string | undefined; status: DiaryStatus | undefined }>({
    userId: undefined,
    status: undefined,
  })

  return (
    <>
      <Form
        layout='vertical'
        form={form}
        style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}
        onFinish={values => {
          setFilters(values)
        }}
      >
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
          name={'status'}
          label={'Статус'}
        >
          <Select
            style={{ width: '250px' }}
            options={[
              { value: DiaryStatus.ACCEPTED, label: 'Принято' },
              { value: DiaryStatus.IN_QUEUE_FOR_CHECK, label: 'В очереди' },
              { value: DiaryStatus.NEEDS_IMPROVEMENT, label: 'Требуется улучшение' },
            ]}
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {data
          ?.filter(diary => {
            const userIdCondition = filters.userId ? diary.userId === filters.userId : true
            const statusCondition = filters.status ? diary.status === filters.status : true

            return userIdCondition && statusCondition
          })
          .map(diary => {
            return (
              <DiaryCard
                key={diary.id}
                diary={diary}
              />
            )
          })}
      </div>
    </>
  )
}
export const Diaries = () => {
  const { data, isFetching } = useDiariesQuery()
  const { data: userIdData } = useUserIdByTokenQuery()

  return (
    <Spin spinning={isFetching}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>Дневники</h1>
          <AddDiariesModal />
        </div>

        <WithRole
          dean={<DeanLayout data={data} />}
          student={
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data
                  ?.filter(diary => diary.userId === userIdData?.userId)
                  .map(diary => {
                    return (
                      <DiaryCard
                        key={diary.id}
                        diary={diary}
                      />
                    )
                  })}
              </div>
            </>
          }
        />
      </div>
    </Spin>
  )
}

export default Diaries
