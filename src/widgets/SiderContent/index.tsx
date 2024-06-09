import { Button, Image } from 'antd'
import { logo } from './logo'

export const SiderContent = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <>
      <Image
        src={logo}
        alt='Логотип'
        preview={false}
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
