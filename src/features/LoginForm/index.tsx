import { Button, Form, Input } from 'antd'
import { useLoginMutation } from './api'
import { LoginRequest } from './api/LoginRequest'

export const LoginForm = () => {
  const [login] = useLoginMutation()
  return (
    <Form<LoginRequest>
      onFinish={login}
      layout='vertical'
      autoComplete='current-password'
    >
      <Form.Item<LoginRequest>
        name='login'
        label='Логин'
      >
        <Input />
      </Form.Item>
      <Form.Item<LoginRequest>
        name='password'
        label='Пароль'
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType='submit'
          type='primary'
        >
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}
