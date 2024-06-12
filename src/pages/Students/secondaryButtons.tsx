import React from 'react'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import AddStudentManuallyForm from 'features/students/AddStudentsManuallyForm'
import ImportCSVStudentsForm from 'features/students/ImportCSVStudentsForm'

const ImportCSVButton: React.FC = () => {
  return (
    <Button
      type='link'
      icon={<PlusCircleOutlined />}
    >
      Импорт из CSV
    </Button>
  )
}

const AddManuallyButton: React.FC = () => {
  return (
    <Button
      type='link'
      icon={<PlusCircleOutlined />}
    >
      Добавить вручную
    </Button>
  )
}

const SecondaryButtons: React.FC = () => {
  return (
    <div style={{ marginTop: '10px' }}>
      <AddStudentManuallyForm />
      <ImportCSVStudentsForm />
      <ImportCSVButton />
      <AddManuallyButton />
    </div>
  )
}

export default SecondaryButtons
