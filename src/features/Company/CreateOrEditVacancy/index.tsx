import { Button, Form, Input, InputNumber, Modal, Select, Spin } from 'antd'
import Editor from 'react-simple-wysiwyg'
import { useState } from 'react'
import { useCompaniesQuery } from 'shared/api'
export const CreateOrEditVacancy = ({
  onFinish,
  buttonText,
  initialValues,
  isLoading,
  showCompanySelect,
}: {
  onFinish: (values: { name: string; description: string; amountOfPeople: number; companyId: string }) => void
  buttonText: string
  initialValues?: {
    name: string
    description: string
    amountOfPeople: number
  }
  isLoading: boolean
  showCompanySelect?: boolean
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const { data } = useCompaniesQuery()
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
            {showCompanySelect && (
              <Form.Item
                name='companyId'
                label='Компания'
                rules={[{ required: true }]}
              >
                <Select
                  options={data?.items.map(company => {
                    return {
                      label: company.name,
                      value: company.id,
                    }
                  })}
                />
              </Form.Item>
            )}
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
