// src/features/InternshipInfo/InternshipInfo.tsx

import React from 'react'
import { Card, Button } from 'antd'

const InternshipInfo: React.FC = () => {
  return (
    <Card title='Информация о стажировке'>
      <p>Компания: red_mad_robot</p>
      <p>Роль: Frontend-разработчик</p>
      <p>Дата начала: 03.06.2022, семестр 6</p>
      <Button
        type='primary'
        style={{ marginRight: 8 }}
      >
        Посмотреть фидбэк
      </Button>
      <Button type='dashed'>Добавить новое место стажировки</Button>
    </Card>
  )
}

export default InternshipInfo
