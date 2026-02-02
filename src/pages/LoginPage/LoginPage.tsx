import type { LoginPageProps } from './LoginPage.types'
import { Login } from '@widgetComponents/Login'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/slices/user/userSlice'
import { useDispatch } from '../../services/store'
import styles from './styles.module.scss'

export const LoginPage: React.FC<LoginPageProps> = () => {
  const dispatch = useDispatch()
  const [emailValue, setEmailValue] = useState<string | null>(null)
  const [passwordValue, setPasswordValue] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubmit = () => {
    dispatch(login({ email: emailValue, password: passwordValue }))
  }

  // TODO: добавить функционал перехода к регистрации
  const onRegister = () => {
    // replace: true чтобы модалка не попала в историю
    navigate('/register', { replace: true })
  }

  // TODO: добавить функционал перехода на страницу восстановления пароля
  const onForgetPassword = () => {}

  return (
    <div className={styles.container}>
      <Login
        onSubmit={onSubmit}
        onRegister={onRegister}
        onForgetPassword={onForgetPassword}
        emailState={[emailValue, setEmailValue] as ReturnType<typeof useState<string>>}
        passwordState={[passwordValue, setPasswordValue] as ReturnType<typeof useState<string>>}
      />
    </div>
  )
}
