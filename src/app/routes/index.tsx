import { lazy } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { INTERNSHIPS_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, STUDENTS_ROUTE } from '../../shared/config'
import { WithAuth } from '../../shared/HOC'
import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'

const LoginPage = lazy(() => import('../../pages/Login'))
const ProfilePage = lazy(() => import('../../pages/Profile'))
const InternshipsPage = lazy(() => import('../../pages/Internships'))
const StudentsPage = lazy(() => import('../../pages/Students'))

const UnAuthLayout = () => {
  return (
    <Layout>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  )
}
const AuthLayout = () => {
  return (
    <Layout>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <WithAuth
            auth={<AuthLayout />}
            unAuth={<Navigate to={LOGIN_ROUTE} />}
          />
        }
      >
        <Route
          path='/'
          element={<></>}
        />
        <Route
          path={PROFILE_ROUTE}
          element={<ProfilePage />}
        />
        <Route
          path={INTERNSHIPS_ROUTE}
          element={<InternshipsPage />}
        />
        <Route
          path={STUDENTS_ROUTE}
          element={<StudentsPage />}
        />
      </Route>

      <Route
        element={
          <WithAuth
            auth={<Navigate to={'/'} />}
            unAuth={<UnAuthLayout />}
          />
        }
      >
        <Route
          path={LOGIN_ROUTE}
          element={<LoginPage />}
        />
      </Route>

      <Route
        path='*'
        element={
          <WithAuth
            auth={<Navigate to={'/'} />}
            unAuth={<Navigate to={LOGIN_ROUTE} />}
          />
        }
      />
    </Routes>
  )
}
