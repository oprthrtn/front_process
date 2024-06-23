// src/features/ProfileInfo/ProfileInfo.tsx

import React from 'react'
import { Card, Typography, Row, Col } from 'antd'
import { useUserInfoByIdQuery } from 'shared/api'
const { Title, Text } = Typography

const ProfileInfo: React.FC = () => {
  const { data: userInfo } = useUserInfoByIdQuery(userId)

  userInfo.firstName = 'Иван'
  userInfo.lastName = 'Иванов'
  userInfo.middleName = 'Иванович'

  return (
    <Card style={{ padding: 0, marginBottom: 24 }}>
      <div
        style={{
          background: 'url("public/Profile/background.jpg") no-repeat center center',
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
            <Text style={{ color: '#fff' }}>{userInfo.roles}</Text>
            {'STUDENT' in userInfo.roles && (
              <Text style={{ color: '#fff' }}>{`${userInfo?.groupNumber}, ${userInfo?.streamNumber}`}</Text>
            )}
          </Col>
        </Row>
      </div>
    </Card>
  )
}

export default ProfileInfo
