import React from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const SearchButton: React.FC = () => {
  return (
    <Button
      type='primary'
      icon={<SearchOutlined />}
    >
      Поиск
    </Button>
  )
}

const ExportCSVButton: React.FC = () => {
  return <Button type='default'>Экспорт в CSV</Button>
}

const ActionButtons: React.FC = () => {
  return (
    <div>
      <SearchButton />
      <ExportCSVButton />
    </div>
  )
}

export default ActionButtons
