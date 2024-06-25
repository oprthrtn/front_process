import React from 'react'
import { Avatar, Typography, Space, Button, Spin } from 'antd'
import { useUserIdByTokenQuery, useUserInfoByIdQuery } from 'shared/api'
import { Link } from 'react-router-dom'
import { PROFILE_ROUTE } from 'shared/config'
const { Title, Text } = Typography
const SiderBottom: React.FC = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const { data: userId } = useUserIdByTokenQuery()
  const { data: userInfo, isLoading: isUserInfoLoading } = useUserInfoByIdQuery(userId!, { skip: !userId })

  if (isUserInfoLoading) {
    return <Spin />
  }

  if (!userInfo) {
    return (
      <div>
        <Text>Не удалось загрузить информацию о пользователе. Попробуйте перезайти</Text>
        <Space />
        <Button
          type='link'
          onClick={logout}
          style={{ padding: 0, fontWeight: 400 }}
        >
          Выход
        </Button>
      </div>
    )
  }

  return (
    <Space
      direction='vertical'
      align='center'
      style={{ width: '100%', padding: '16px 0' }}
    >
      <Avatar
        size={64}
        src={'userInfo.avatarUrl'} // Предполагается, что avatarUrl есть в userInfo
        alt='User Avatar'
      />
      <Title
        level={4}
        style={{ margin: 0 }}
      >
        <Link to={PROFILE_ROUTE('me')}>
          {userInfo.firstName} {userInfo.lastName}
        </Link>
      </Title>
      <Text style={{ marginBottom: 8 }}>
        {userInfo.streamNumber}, {userInfo.groupNumber}
      </Text>
      <Space size='small'>
        <Button
          type='link'
          style={{ padding: 0, fontWeight: 400 }}
        >
          Настройки
        </Button>
        <Button
          type='link'
          onClick={logout}
          style={{ padding: 0, fontWeight: 400 }}
        >
          Выход
        </Button>
      </Space>
    </Space>
  )
}

export default SiderBottom
