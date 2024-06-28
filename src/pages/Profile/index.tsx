// src/pages/StudentPage.tsx

import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserIdByTokenQuery } from 'shared/api'

import ProfileInfo from 'features/Profile/ProfileInfo'
import InternshipInfo from 'features/Profile/InternshipInfo'
import { Spin } from 'antd'

// import ReportList from 'features/ReportList'

const ProfilePage: React.FC = () => {
  const { userId: paramUserId } = useParams<{ userId: string }>() // Всегда строка
  const { data: userIdFromToken, isLoading: isLoadingUserId } = useUserIdByTokenQuery()

  const userId = paramUserId === 'me' ? userIdFromToken?.userId : paramUserId

  return (
    <Spin spinning={isLoadingUserId}>
      <ProfileInfo userId={userId} />
      <InternshipInfo userId={userId!} />
      {/* <ReportList /> */}
    </Spin>
  )
}

export default ProfilePage
