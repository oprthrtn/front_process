import React, { useState } from 'react'
import { Modal, Form, Input, Button, Table, Pagination, Upload } from 'antd'
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons'
import { RcFile } from 'antd/es/upload/interface'
import { Student } from 'shared/entities/student'
import { PlusCircleOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const ImportCSVStudentsForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [students, setStudents] = useState<Student[]>([])
  const [form] = Form.useForm()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const addStudent = () => {
    form.validateFields().then(values => {
      setStudents([...students, { ...values, key: Date.now() }])
      form.resetFields()
    })
  }

  const handleFileUpload = (file: RcFile) => {
    if (file != null) {
      return true
    }
    // Обработайте файл здесь, например, распарсите CSV и добавьте студентов в состояние
    return false // Предотвращает автоматическую загрузку файла
  }

  const removeStudent = (key: number) => {
    setStudents(students.filter(student => student.key !== key))
  }

  const columns = [
    {
      title: 'Студент',
      dataIndex: 'student',
      key: 'student',
      render: (record: Student) => `${record.lastName} ${record.firstName} ${record.middleName}`,
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
      render: (record: Student) => (
        <Button
          type='link'
          icon={<DeleteOutlined />}
          onClick={() => removeStudent(record.key)}
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
        Импорт из CSV
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
        <Dragger
          name='file'
          multiple={false}
          beforeUpload={handleFileUpload}
          style={{ marginBottom: 24 }}
        >
          <p className='ant-upload-drag-icon'>
            <UploadOutlined style={{ fontSize: 48, color: '#722ED1' }} />
          </p>
          <p className='ant-upload-text'>
            Drag & drop files or <a href='#'>Browse</a>
          </p>
          <p className='ant-upload-hint'>Supported format: CSV</p>
        </Dragger>
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
          style={{ marginTop: 16 }}
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

export default ImportCSVStudentsForm
