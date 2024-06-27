// src/features/ProfileInfo/ProfileInfo.tsx

import React from 'react'
import { Card, Typography, Row, Col, Spin } from 'antd'
import { useUserInfoByIdQuery } from 'shared/api'
import { UserRole } from 'shared/entities'
const { Title, Text } = Typography

interface ProfileInfoProps {
  userId?: string
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { data: userInfo, isFetching } = useUserInfoByIdQuery({ userId: userId! }, { skip: !userId })

  if (!userInfo) {
    return <div>Не удалось загрузить информацию о пользователе</div>
  }

  return (
    <Spin spinning={isFetching}>
      <Card style={{ padding: 0, marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Title level={2}>{`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}</Title>
            <Text>{userInfo.roles.join(', ')}</Text>
            {userInfo.roles.includes(UserRole.STUDENT) && (
              <Text>{`${userInfo.groupNumber}, ${userInfo.streamNumber}`}</Text>
            )}
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default ProfileInfo
