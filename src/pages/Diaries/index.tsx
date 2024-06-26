import { Button, Form, Input, Modal, Select, Spin, Upload } from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAddDiaryMutation, useDiariesQuery, useUserIdByTokenQuery } from 'shared/api'
import { DIARY_ROUTE } from 'shared/config'
import { DiaryStatus } from 'shared/entities'

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
      >
        Добавить дневник
      </Button>
    </>
  )
}

export const Diaries = () => {
  const { data, isFetching } = useDiariesQuery()

  return (
    <Spin spinning={isFetching}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>Дневники</h1>
          <AddDiariesModal />
        </div>

        {data?.map(diary => {
          return (
            <Link
              to={DIARY_ROUTE(diary.id)}
              key={diary.id}
            >
              {diary.name}
            </Link>
          )
        })}
      </div>
    </Spin>
  )
}

export default Diaries
