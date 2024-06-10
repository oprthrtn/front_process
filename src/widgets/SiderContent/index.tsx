import { Button, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { DIARIES_ROUTE, TEMPLATES_ROUTE } from 'shared/config'

export const SiderContent = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <>
      <Menu
        theme='dark'
        items={[
          { label: <Link to={DIARIES_ROUTE}>Дневники</Link>, key: DIARIES_ROUTE },
          { label: <Link to={TEMPLATES_ROUTE}>Шаблоны</Link>, key: TEMPLATES_ROUTE },
        ]}
      />
      <Button
        danger
        onClick={logout}
      >
        Выйти
      </Button>
    </>
  )
}
