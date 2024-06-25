// src/features/ProfileInfo/ProfileInfo.tsx

import React from 'react'
import { Card, Typography, Row, Col, Spin } from 'antd'
import { useUserInfoByIdQuery } from 'shared/api'
import { UserRole } from 'shared/entities'
const { Title, Text } = Typography

interface ProfileInfoProps {
  userId: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { data: userInfo, isLoading } = useUserInfoByIdQuery({ userId: userId }, { skip: !userId })

  if (isLoading) {
    return <Spin />
  }

  if (!userInfo) {
    return <div>Не удалось загрузить информацию о пользователе</div>
  }

  return (
    <Card style={{ padding: 0, marginBottom: 24 }}>
      <div
        style={{
          background: 'url("/Profile/background.jpg") no-repeat center center',
          backgroundSize: 'cover',
          padding: 24,
          color: '#fff',
          borderRadius: '2px 2px 0 0',
        }}
      >
        <Row gutter={16}>
          <Col span={4}>
            <div
              style={{
                width: '100%',
                height: 100,
                background: '#ccc',
                borderRadius: '50%',
              }}
            />
          </Col>
          <Col span={20}>
            <Title
              level={2}
              style={{ color: '#fff' }}
            >
              {`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}
            </Title>
            <Text style={{ color: '#fff' }}>{userInfo.roles.join(', ')}</Text>
            {userInfo.roles.includes(UserRole.STUDENT) && (
              <Text style={{ color: '#fff' }}>{`${userInfo.groupNumber}, ${userInfo.streamNumber}`}</Text>
            )}
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default ProfileInfo
