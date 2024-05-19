import { Button } from 'antd'

export const SiderContent = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <>
      <Button
        danger
        onClick={logout}
      >
        Выйти
      </Button>
    </>
  )
}
