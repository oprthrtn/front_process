import { Button, Form, Input, Modal, Spin } from 'antd'
import Editor from 'react-simple-wysiwyg'
import { useState } from 'react'
export const CreateOrEditCompany = ({
  onFinish,
  buttonText,
  initialValues,
  isLoading,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFinish: (values: { name: string; description: string }) => Promise<any>
  buttonText: string
  initialValues?: { name: string; description: string }
  isLoading: boolean
}) => {
  const [open, setOpen] = useState<boolean>(false)
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
            onFinish={values => {
              onFinish(values).then(() => {
                setOpen(false)
              })
            }}
            initialValues={initialValues}
            layout='vertical'
          >
            <Form.Item
              name='name'
              label='Название'
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='description'
              label='Описание'
              rules={[{ required: true }]}
            >
              <Editor />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType='submit'
                type='primary'
              >
                {buttonText}
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
        {buttonText}
      </Button>
    </>
  )
}
