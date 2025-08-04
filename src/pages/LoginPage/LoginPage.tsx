import type { LoginPageProps } from './LoginPage.types'
import { Login } from '@widgetComponents/Login'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



export const LoginPage: React.FC<LoginPageProps> = () => {
  const [emailValue, setEmailValue] = useState<string | null>(null)
  const [passwordValue, setPasswordValue] = useState<string | null>(null)
  const navigate = useNavigate()

  // TODO: добавить функционал входа пользователя
  const onSubmit = () => {}

  // TODO: добавить функционал перехода к регистрации
  const onRegister = () => {
    navigate('/register')
  }

  // TODO: добавить функционал перехода на страницу восстановления пароля
  const onForgetPassword = () => {}

  return (
    <Login
      onSubmit={onSubmit}
      onRegister={onRegister}
      onForgetPassword={onForgetPassword}
      emailState={[emailValue, setEmailValue] as ReturnType<typeof useState<string>>}
      passwordState={[passwordValue, setPasswordValue] as ReturnType<typeof useState<string>>}
    />
  )
}
