/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Input, Modal, Upload, Form, Spin, Typography } from 'antd'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { WithRole } from 'shared/HOC'
import {
  useAddTemplateMutation,
  useDeleteTemplateMutation,
  useEditTemplateMutation,
  useTemplatesQuery,
} from 'shared/api'

const { Text } = Typography
const AddTemplatesModal = ({
  onFinish,
  isLoading,
  buttonText,
  initialValues,
}: {
  onFinish: (data: { name: string; description: string; file: any }) => Promise<any>

  isLoading: boolean
  buttonText: string
  initialValues?: any
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
            initialValues={initialValues}
            onFinish={values => {
              onFinish(values).then(() => {
                setModalOpen(false)
              })
            }}
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
              <Input.TextArea />
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
        type='primary'
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
                  return addTemplate({ formData }).unwrap()
                }

                return new Promise((_resolve, reject) => {
                  reject()
                })
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
              >
                <Text strong>Описание: </Text>
                {template.description}

                <div>
                  <Text strong>Дата создания: </Text>
                  {new Date(template.creationDate).toLocaleString('ru')}
                </div>
              </Card>
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
              >
                <Text strong>Описание: </Text>
                {template.description}

                <div>
                  <Text strong>Дата создания: </Text>
                  {new Date(template.creationDate).toLocaleString('ru')}
                </div>
              </Card>
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
                    initialValues={template}
                    buttonText='Обновить шаблон'
                    isLoading={editIsLoading}
                    onFinish={values => {
                      const file = values.file.file

                      if (file) {
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('dto', JSON.stringify({ name: values.name, description: values.description }))
                        return editTemplate({ formData, id: template.id }).unwrap()
                      }

                      return new Promise((_resolve, reject) => {
                        reject()
                      })
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
              >
                <Text strong>Описание: </Text>
                {template.description}

                <div>
                  <Text strong>Дата создания: </Text>
                  {new Date(template.creationDate).toLocaleString('ru')}
                </div>
              </Card>
            )
          })}
        />
      </div>
    </Spin>
  )
}

export default Templates
