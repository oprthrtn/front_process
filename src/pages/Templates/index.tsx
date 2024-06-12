import { Button, Card, Input, Modal, Upload, Form } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useEditTemplateMutation,
  useTemplatesQuery,
} from 'shared/api'

const AddTemplatesModal = ({
  onFinish,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (data: { name: string; description: string; file: any }) => void
}) => {
  const [openModal, setModalOpen] = useState<boolean>(false)

  return (
    <>
      <Modal
        open={openModal}
        onCancel={() => {
          setModalOpen(false)
        }}
        footer={null}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name={'name'}
            label={'Название'}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={'description'}
            label={'Описание'}
          >
            <Input />
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
        Добавить шаблон
      </Button>
    </>
  )
}

const Templates = () => {
  const { data } = useTemplatesQuery()
  const [deleteTemplate] = useDeleteTemplateMutation()
  const [editTemplate] = useEditTemplateMutation()
  const [addTemplate] = useAddTemplateMutation()

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Шаблоны</h1>
        <WithRole
          dean={
            <AddTemplatesModal
              onFinish={values => {
                const file = values.file.file

                if (file) {
                  const formData = new FormData()
                  formData.append('file', file)
                  formData.append('dto', JSON.stringify({ name: values.name, description: values.description }))
                  addTemplate({ formData })
                }
              }}
            />
          }
        />
      </div>

      <WithRole
        student={data?.map(template => {
          return (
            <Card
              key={template.id}
              actions={[
                <Link
                  to={`${import.meta.env.VITE_DIARIES_API_URL}/files/download?filePath=${template.filePath}`}
                  target='_blank'
                >
                  Скачать шаблон
                </Link>,
              ]}
              title={template.name}
            ></Card>
          )
        })}
        company={data?.map(template => {
          return (
            <Card
              key={template.id}
              actions={[
                <Link
                  to={`${import.meta.env.VITE_DIARIES_API_URL}/files/download?filePath=${template.filePath}`}
                  target='_blank'
                >
                  Скачать шаблон
                </Link>,
              ]}
              title={template.name}
            ></Card>
          )
        })}
        dean={data?.map(template => {
          return (
            <Card
              key={template.id}
              actions={[
                <Link
                  to={`${import.meta.env.VITE_DIARIES_API_URL}/files/download?filePath=${template.filePath}`}
                  target='_blank'
                >
                  Скачать шаблон
                </Link>,
                <AddTemplatesModal
                  onFinish={values => {
                    const file = values.file.file

                    if (file) {
                      const formData = new FormData()
                      formData.append('file', file)
                      formData.append('dto', JSON.stringify({ name: values.name, description: values.description }))
                      editTemplate({ formData, id: template.id })
                    }
                  }}
                />,

                <Button
                  danger
                  onClick={() => {
                    deleteTemplate({ id: template.id })
                  }}
                >
                  Удалить шаблон
                </Button>,
              ]}
              title={template.name}
            ></Card>
          )
        })}
      />
    </>
  )
}

export default Templates
