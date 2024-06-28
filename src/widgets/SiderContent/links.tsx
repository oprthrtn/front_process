import {
  STUDENTS_ROUTE,
  COMPANY_ROUTE,
  DIARIES_ROUTE,
  INTERNSHIPS_ROUTE,
  TEMPLATES_ROUTE,
  VACANCIES_ROUTE,
  RECRUITEDSTUDENTS_ROUTE,
} from 'shared/config'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { WithRole } from 'shared/HOC'
const LinksMenu: React.FC = () => {
  const { pathname } = useLocation()

  const studentMenuItems = [
    { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
    { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
    { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
    { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
  ]

  const deanMenuItems = [
    { label: <Link to={STUDENTS_ROUTE}>Студенты</Link>, key: STUDENTS_ROUTE },
    { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
    { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
    { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
    { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
    { label: <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>, key: INTERNSHIPS_ROUTE },
  ]

  const companyMenuItems = [
    { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
    { label: <Link to={INTERNSHIPS_ROUTE}>Набор студентов</Link>, key: INTERNSHIPS_ROUTE },
    { label: <Link to={RECRUITEDSTUDENTS_ROUTE}>Набранные студенты</Link>, key: RECRUITEDSTUDENTS_ROUTE },
  ]

  return (
    <WithRole
      student={
        <Menu
          theme='light'
          selectedKeys={[pathname]}
          items={studentMenuItems}
        />
      }
      company={
        <Menu
          theme='light'
          selectedKeys={[pathname]}
          items={companyMenuItems}
        />
      }
      dean={
        <Menu
          theme='light'
          selectedKeys={[pathname]}
          items={deanMenuItems}
        />
      }
    />
  )
}

export default LinksMenu
