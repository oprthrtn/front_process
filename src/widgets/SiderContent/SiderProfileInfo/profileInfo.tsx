// src/features/UserProfile/UserProfile.tsx

import React from 'react'
import { Avatar, Typography, Space, Button, Spin } from 'antd'
import { useUserIdByTokenQuery, useUserInfoByIdQuery } from 'shared/api'
const { Title, Text } = Typography

const UserProfile: React.FC = () => {
  const { data: userId } = useUserIdByTokenQuery()
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfoByIdQuery(userId!, { skip: !userId })

  if (isUserInfoLoading) {
    return <Spin />
  }

  if (!userInfo) {
    return <div>Не удалось загрузить информацию о пользователе</div>
  }

  return (
    <Space
      direction='vertical'
      align='center'
      style={{ width: '100%', padding: '16px 0' }}
    >
      <Avatar
        size={64}
        // src={avatarUrl}
      />
      <Title level={4}>
        {userInfo.firstName} {userInfo.lastName}
      </Title>
      <Text>
        {userInfo.streamNumber}, {userInfo.groupNumber}
      </Text>
      <Space>
        <Button type='link'>Настройки</Button>
        <Button type='link'>Выход</Button>
      </Space>
    </Space>
  )
}

export default UserProfile
