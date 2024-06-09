import { Button } from 'antd'

const SiderBottom = () => {
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '16px',
      }}
    >
      <Button
        danger
        onClick={logout}
      >
        Выйти
      </Button>
    </div>
  )
}

export default SiderBottom
