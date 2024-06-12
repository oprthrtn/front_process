import { Button, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { COMPANY_ROUTE, DIARIES_ROUTE, INTERNSHIPS_ROUTE, TEMPLATES_ROUTE, VACANCIES_ROUTE } from 'shared/config'

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
          { label: <Link to={COMPANY_ROUTE}>Компании</Link>, key: COMPANY_ROUTE },
          { label: <Link to={VACANCIES_ROUTE}>Вакансии</Link>, key: VACANCIES_ROUTE },
          { label: <Link to={INTERNSHIPS_ROUTE}>Стажировки</Link>, key: INTERNSHIPS_ROUTE },
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
