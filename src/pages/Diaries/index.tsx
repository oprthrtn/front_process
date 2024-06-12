import { Button, Form, Input, Modal, Select, Upload } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAddDiaryMutation, useDiariesQuery, useUserIdByTokenQuery } from 'shared/api'
import { DIARY_ROUTE } from 'shared/config'
import { DiaryStatus } from 'shared/entities'

const AddDiariesModal = () => {
  const [openModal, setModalOpen] = useState<boolean>(false)
  const { data: userId } = useUserIdByTokenQuery()
  const [addDiary] = useAddDiaryMutation()
  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => {
          setModalOpen(false)
        }}
        footer={null}
      >
        <Form
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
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'status'}
            label={'Статус'}
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
            <Button htmlType='submit'>Добавить</Button>
          </Form.Item>
        </Form>
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
  const { data } = useDiariesQuery()

  return (
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
  )
}

export default Diaries
