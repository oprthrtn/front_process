import { Button, Form, Input, InputNumber, Modal, Spin } from 'antd'

import { useState } from 'react'
export const CreateOrEditVacancy = ({
  onFinish,
  buttonText,
  initialValues,
  isLoading,
}: {
  onFinish: (values: { name: string; description: string; amountOfPeople: number }) => void
  buttonText: string
  initialValues?: {
    name: string
    description: string
    amountOfPeople: number
  }
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
            onFinish={onFinish}
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
              <Input />
            </Form.Item>
            <Form.Item
              name='amountOfPeople'
              label='Количество людей'
              rules={[{ required: true }]}
            >
              <InputNumber />
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
        onClick={() => {
          setOpen(true)
        }}
      >
        {buttonText}
      </Button>
    </>
  )
}
