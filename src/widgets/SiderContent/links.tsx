import { INTERNSHIPS_ROUTE, VACANCIES_ROUTE, COMPANY_ROUTE } from '../../shared/config/routes'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { DIARIES_ROUTE, TEMPLATES_ROUTE } from 'shared/config'
import { WithRole } from 'shared/HOC'

const LinksMenu: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const handleClick = (key: string) => {
    setSelectedKey(key)
  }

  return (
    <Menu
      mode='inline'
      selectedKeys={[selectedKey || '']}
      onClick={e => handleClick(e.key as string)}
    >
      <WithRole
        student={
          <Menu
            theme='dark'
            items={[
              { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
              { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
              { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
              { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
              { label: <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>, key: INTERNSHIPS_ROUTE },
            ]}
          />
        }
        company={
          <Menu
            theme='dark'
            items={[
              { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
              { label: <Link to={INTERNSHIPS_ROUTE}>Набор студентов</Link>, key: INTERNSHIPS_ROUTE },
              { label: <Link to={TEMPLATES_ROUTE}>Набранные студенты</Link>, key: TEMPLATES_ROUTE },
            ]}
          />
        }
        dean={
          // TODO: - Добавить элементы для деканата
          <></>
        }
      />
    </Menu>
  )
}

export default LinksMenu
