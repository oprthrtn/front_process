import { Card, Flex } from 'antd'
import { LoginForm } from 'features/LoginForm'
const Login = () => {
  return (
    <Flex
      align='center'
      justify='center'
      style={{ height: '100%' }}
    >
      <Card title='Войти'>
        <LoginForm />
      </Card>
    </Flex>
  )
}

export default Login
