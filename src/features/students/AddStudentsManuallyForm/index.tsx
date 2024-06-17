import React, { useState } from 'react'
import { Modal, Form, Input, Button, Table, Pagination } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { PlusCircleOutlined } from '@ant-design/icons'
import { UserInfo } from 'shared/entities'

const AddStudentManuallyForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [students, setStudents] = useState<UserInfo[]>([])
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addStudent = () => {
    form.validateFields().then(values => {
      setStudents([...students, { ...values }])
      form.resetFields()
    })
  }

  const removeStudent = (key: React.Key) => {
    setStudents(students.filter(student => student.email !== key))
  }

  const columns = [
    {
      title: 'Студент',
      dataIndex: 'student',
      key: 'student',
      render: (record: UserInfo) => `${record.lastName} ${record.firstName} ${record.middleName}`,
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Поток',
      dataIndex: 'stream',
      key: 'stream',
    },
    {
      title: '',
      key: 'action',
      render: (record: UserInfo) => (
        <Button
          type='link'
          icon={<DeleteOutlined />}
          onClick={() => removeStudent(record.email)}
        />
      ),
    },
  ]

  return (
    <div>
      <Button
        type='link'
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Добавить вручную
      </Button>
      <Modal
        title='Добавление студентов'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button
            key='cancel'
            onClick={handleCancel}
            style={{ backgroundColor: '#FF4D4F', color: 'white' }}
          >
            Отмена
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={handleCancel}
            style={{ backgroundColor: '#722ED1', color: 'white' }}
          >
            Создать
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout='vertical'
          name='studentForm'
          initialValues={{ remember: true }}
        >
          <Form.Item
            name='lastName'
            rules={[{ required: true, message: 'Пожалуйста, введите фамилию!' }]}
          >
            <Input placeholder='Фамилия' />
          </Form.Item>
          <Form.Item
            name='firstName'
            rules={[{ required: true, message: 'Пожалуйста, введите имя!' }]}
          >
            <Input placeholder='Имя' />
          </Form.Item>
          <Form.Item name='middleName'>
            <Input placeholder='Отчество' />
          </Form.Item>
          <Form.Item
            name='stream'
            rules={[{ required: true, message: 'Пожалуйста, введите поток!' }]}
          >
            <Input placeholder='Поток' />
          </Form.Item>
          <Form.Item
            name='group'
            rules={[{ required: true, message: 'Пожалуйста, введите группу!' }]}
          >
            <Input placeholder='Группа' />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              onClick={addStudent}
              style={{ backgroundColor: '#722ED1', color: 'white', width: '100%' }}
            >
              Добавить еще
            </Button>
          </Form.Item>
        </Form>
        <Table
          dataSource={students}
          columns={columns}
          pagination={false}
        />
        <Pagination
          defaultCurrent={1}
          total={students.length}
          style={{ textAlign: 'center', marginTop: 16 }}
        />
      </Modal>
    </div>
  )
}

export default AddStudentManuallyForm
