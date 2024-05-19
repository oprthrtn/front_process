import { ReactNode } from 'react'

type WithAuthProps = {
  auth: ReactNode
  unAuth: ReactNode
}
export const WithAuth = ({ auth, unAuth }: WithAuthProps) => {
  const token = localStorage.getItem('token')
  return token ? auth : unAuth
}
