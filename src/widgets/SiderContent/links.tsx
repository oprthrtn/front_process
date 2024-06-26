import {
  LOGIN_ROUTE,
  STUDENTS_ROUTE,
  COMPANY_ROUTE,
  DIARIES_ROUTE,
  INTERNSHIPS_ROUTE,
  TEMPLATES_ROUTE,
  VACANCIES_ROUTE,
  RECRUITEDSTUDENTS_ROUTE,
} from 'shared/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { WithRole } from 'shared/HOC'
const LinksMenu: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>(DIARIES_ROUTE)

  const handleClick = (key: string) => {
    setSelectedKey(key)
  }

  const studentMenuItems = [
    { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
    { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
    { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
    { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
    { label: <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>, key: INTERNSHIPS_ROUTE },
  ]

  const deanMenuItems = [
    { label: <Link to={LOGIN_ROUTE}>Вход (dev only)</Link>, key: LOGIN_ROUTE },
    { label: <Link to={STUDENTS_ROUTE}>Студенты</Link>, key: STUDENTS_ROUTE },
    { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
    { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
    { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
    { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
    { label: <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>, key: INTERNSHIPS_ROUTE },
  ]

  const companyMenuItems = [
    { label: <Link to={DIARIES_ROUTE}>Вакансии</Link>, key: DIARIES_ROUTE },
    { label: <Link to={INTERNSHIPS_ROUTE}>Набор студентов</Link>, key: INTERNSHIPS_ROUTE },
    { label: <Link to={RECRUITEDSTUDENTS_ROUTE}>Набранные студенты</Link>, key: RECRUITEDSTUDENTS_ROUTE },
  ]

  return (
    <Menu
      mode='inline'
      selectedKeys={[selectedKey]}
      onClick={e => handleClick(e.key as string)}
    >
      <WithRole
        student={
          <Menu
            theme='light'
            selectedKeys={[selectedKey]}
            onClick={e => handleClick(e.key as string)}
            items={studentMenuItems}
          />
        }
        company={
          <Menu
            theme='light'
            selectedKeys={[selectedKey]}
            onClick={e => handleClick(e.key as string)}
            items={companyMenuItems}
          />
        }
        dean={
          <Menu
            theme='light'
            selectedKeys={[selectedKey]}
            onClick={e => handleClick(e.key as string)}
            items={deanMenuItems}
          />
        }
      />
    </Menu>
  )
}

export default LinksMenu
