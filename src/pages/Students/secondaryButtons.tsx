import React from 'react'
import { Button } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

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
      <ImportCSVButton />
      <AddManuallyButton />
    </div>
  )
}

export default SecondaryButtons
