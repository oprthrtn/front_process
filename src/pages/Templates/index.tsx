import { Button, Card, Input, Modal, Upload, Form, Spin } from 'antd'
import { useMemo, useState } from 'react'
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
  isLoading,
  buttonText,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (data: { name: string; description: string; file: any }) => void
  isLoading: boolean
  buttonText: string
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
        <Spin spinning={isLoading}>
          <Form
            onFinish={onFinish}
            layout='vertical'
          >
            <Form.Item
              name={'name'}
              label={'Название'}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={'description'}
              label={'Описание'}
              rules={[{ required: true }]}
            >
              <Input />
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
        {buttonText}
      </Button>
    </>
  )
}

const Templates = () => {
  const { data, isFetching: templatesIsFetching } = useTemplatesQuery()
  const [deleteTemplate, { isLoading: deleteIsLoading }] = useDeleteTemplateMutation()
  const [editTemplate, { isLoading: editIsLoading }] = useEditTemplateMutation()
  const [addTemplate, { isLoading: addIsLoading }] = useAddTemplateMutation()

  const isLoading = useMemo(
    () => templatesIsFetching || deleteIsLoading || editIsLoading || addIsLoading,
    [addIsLoading, deleteIsLoading, editIsLoading, templatesIsFetching]
  )
  return (
    <Spin spinning={isLoading}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Шаблоны</h1>
        <WithRole
          dean={
            <AddTemplatesModal
              buttonText='Добавить шаблон'
              isLoading={addIsLoading}
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
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
                    buttonText='Обновить шаблон'
                    isLoading={editIsLoading}
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
      </div>
    </Spin>
  )
}

export default Templates
