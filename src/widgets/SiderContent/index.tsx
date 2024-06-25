import LogoImage from './logo'
import SiderBottom from './bottom'
import { Menu, Button } from 'antd'
import { Link } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  STUDENTS_ROUTE,
  COMPANY_ROUTE,
  DIARIES_ROUTE,
  INTERNSHIPS_ROUTE,
  TEMPLATES_ROUTE,
  VACANCIES_ROUTE,
} from 'shared/config'
import { WithAuth } from 'shared/HOC'
import { Navigate } from 'react-router-dom'
export const SiderContent = () => {
  return (
    <>
      <LogoImage />
      <Menu
        mode='inline'
        theme='light'
        items={[
          { label: <Link to={LOGIN_ROUTE}>Вход (dev only)</Link>, key: LOGIN_ROUTE },
          { label: <Link to={STUDENTS_ROUTE}>Студенты</Link>, key: STUDENTS_ROUTE },
          { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
          { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
          { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
          { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
          { label: <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>, key: INTERNSHIPS_ROUTE },
        ]}
      />
      <WithAuth
        auth={<SiderBottom />}
        unAuth={<Button onClick={() => <Navigate to={LOGIN_ROUTE} />}>Войти в аккаунт</Button>}
      />
    </>
  )
}
