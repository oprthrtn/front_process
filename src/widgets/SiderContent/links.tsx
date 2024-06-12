import { LOGIN_ROUTE, PROFILE_ROUTE, INTERNSHIPS_ROUTE, STUDENTS_ROUTE } from '../../shared/config/routes'
import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import { DIARIES_ROUTE, TEMPLATES_ROUTE } from 'shared/config'

const LinksMenu: React.FC = () => {
  return (
    <Menu mode='inline'>
      <Menu.Item key='login'>
        <Link to={LOGIN_ROUTE}>Вход (dev only)</Link> {/* TODO: remove this route*/}
      </Menu.Item>
      <Menu.Item key='profile'>
        <Link to={PROFILE_ROUTE}>Профиль</Link>
      </Menu.Item>
      <Menu.Item key='internships'>
        <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>
      </Menu.Item>
      <Menu.Item key='students'>
        <Link to={STUDENTS_ROUTE}>Студенты</Link>
      </Menu.Item>
      <Menu.Item key='diaries'>
        <Link to={DIARIES_ROUTE}>Дневники</Link>
      </Menu.Item>
      <Menu.Item key='templates'>
        <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LinksMenu
