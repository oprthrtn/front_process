// src/pages/StudentPage.tsx

import React from 'react'
import ProfileInfo from 'features/Profile/ProfileInfo'
import InternshipInfo from 'features/Profile/InternshipInfo'
// import ReportList from 'features/ReportList'

const ProfilePage: React.FC = () => {
  return (
    <>
      <ProfileInfo />
      <InternshipInfo />
      {/* <ReportList /> */}
    </>
  )
}

export default ProfilePage
