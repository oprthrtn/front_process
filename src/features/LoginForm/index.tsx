import { Button, Form, Input } from 'antd'
import { useLoginMutation } from './api'
import { LoginRequest } from './api/LoginRequest'

export const LoginForm = () => {
  const [login] = useLoginMutation()

  const loginHanlder = async (data: LoginRequest) => {
    try {
      const { token } = await login(data).unwrap()

      localStorage.setItem('token', token)
      window.location.reload()
    } catch (e) {
      /* empty */
    }
  }
  return (
    <Form<LoginRequest>
      onFinish={loginHanlder}
      layout='vertical'
      autoComplete='current-password'
    >
      <Form.Item<LoginRequest>
        name='email'
        label='E-mail'
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
