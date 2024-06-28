import React, { useState } from 'react'
import { Modal, Form, Input, Button, Table, Pagination } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { PlusCircleOutlined } from '@ant-design/icons'
import { UserInfo } from 'shared/entities'
import { useDeleteUserMutation, useRegisterUserMutation } from './api'

const AddStudentManuallyForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [students, setStudents] = useState<UserInfo[]>([])
  const [form] = Form.useForm()

  const [deleteUser] = useDeleteUserMutation()
  const [registerUser] = useRegisterUserMutation()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addStudent = () => {
    form.validateFields().then(values => {
      values.username = values.lastName + values.firstName // TODO: поменять, это кринжатина
      registerUser({
        username: values.username,
        email: `${values.username}@email.com`, // TODO: поменять, это кринжатина
        password: 'generatePassword', // TODO: поменять, это кринжатина
        firstName: values.firstName,
        lastName: values.lastName,
        middleName: values.middleName,
        streamNumber: values.streamNumber,
        groupNumber: values.groupNumber,
        companyId: '00000000-0000-0000-0000-000000000001',
        roles: ['STUDENT'],
      })

      setStudents([...students, { ...values }])
      form.resetFields()
    })
  }

  const removeStudent = (key: React.Key) => {
    deleteUser(students.filter(student => student.username == key)[0].username)
    setStudents(students.filter(student => student.username !== key))
  }

  const columns = [
    {
      title: 'Студент',
      key: 'student',
      render: (_: string, record: UserInfo) => `${record.lastName} ${record.firstName} ${record.middleName}`,
    },
    {
      title: 'Группа',
      dataIndex: 'groupNumber',
      key: 'groupNumber',
    },
    {
      title: 'Поток',
      dataIndex: 'streamNumber',
      key: 'stream',
    },
    {
      title: '',
      key: 'action',
      render: (record: UserInfo) => (
        <Button
          type='link'
          icon={<DeleteOutlined />}
          onClick={() => removeStudent(record.username)}
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
        footer={
          <Button
            key='cancel'
            onClick={handleCancel}
            style={{ backgroundColor: '#FF4D4F', color: 'white' }}
          >
            Закрыть
          </Button>
        }
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
            name='streamNumber'
            rules={[{ required: true, message: 'Пожалуйста, введите поток!' }]}
          >
            <Input placeholder='Поток' />
          </Form.Item>
          <Form.Item
            name='groupNumber'
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
          rowKey='username'
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
