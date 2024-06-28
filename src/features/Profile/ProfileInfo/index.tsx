// src/features/ProfileInfo/ProfileInfo.tsx

import React from 'react'
import { Card, Typography, Row, Col, Spin } from 'antd'
import { useCompaniesByIdQuery, useUserInfoByIdQuery } from 'shared/api'

import { WithRole } from 'shared/HOC'
import { Link } from 'react-router-dom'
import { COMPANIES_ROUTE } from 'shared/config'
import { UserRole } from 'shared/entities'
const { Title, Text } = Typography

interface ProfileInfoProps {
  userId?: string
}

const roleToStrng: { [k in UserRole]: string } = {
  [UserRole.STUDENT]: 'студент',
  [UserRole.COMPANY]: 'компания',
  [UserRole.DEANERY]: 'деканат',
}
const ProfileInfo: React.FC<ProfileInfoProps> = ({ userId }) => {
  const { data: userInfo, isFetching } = useUserInfoByIdQuery({ userId: userId! }, { skip: !userId })
  const companyId = userInfo?.companyId
  const { data: companyData } = useCompaniesByIdQuery({ companyId: companyId! }, { skip: !companyId })
  if (!userInfo) {
    return <div>Не удалось загрузить информацию о пользователе</div>
  }

  return (
    <Spin spinning={isFetching}>
      <Card style={{ padding: 0, marginBottom: 24 }}>
        <Row gutter={16}>
          <Col span={24}>
            <Title level={2}>{`${userInfo.lastName} ${userInfo.firstName} ${userInfo.middleName}`}</Title>
            <div>
              <Text>
                {userInfo.roles
                  .map(role => {
                    return roleToStrng[role]
                  })
                  .join(', ')}
              </Text>
            </div>
            <WithRole
              student={
                <>
                  <Text>{`Группа: ${userInfo.groupNumber}`}</Text>
                  <Text>{`Поток: ${userInfo.streamNumber}`}</Text>
                </>
              }
              company={
                <div>
                  <Link to={COMPANIES_ROUTE(companyData?.id)}>{companyData?.name}</Link>
                </div>
              }
            />
          </Col>
        </Row>
      </Card>
    </Spin>
  )
}

export default ProfileInfo
