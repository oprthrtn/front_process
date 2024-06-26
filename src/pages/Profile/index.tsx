// src/pages/StudentPage.tsx

import React from 'react'
import { useParams } from 'react-router-dom'
import { useUserIdByTokenQuery } from 'shared/api'

import ProfileInfo from 'features/Profile/ProfileInfo'
import InternshipInfo from 'features/Profile/InternshipInfo'
// import ReportList from 'features/ReportList'

const ProfilePage: React.FC = () => {
  const { userId: paramUserId } = useParams<{ userId: string }>() // Всегда строка
  const { data: userIdFromToken, isLoading: isLoadingUserId } = useUserIdByTokenQuery()

  const userId = paramUserId === 'me' ? userIdFromToken?.userId : paramUserId

  if (isLoadingUserId) {
    return <div>Loading...</div>
  }

  if (!userId) {
    return <div>Не удалось загрузить информацию о пользователе</div>
  }

  return (
    <>
      <ProfileInfo userId={userId} />
      <InternshipInfo />
      {/* <ReportList /> */}
    </>
  )
}

export default ProfilePage
