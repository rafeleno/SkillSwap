import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { ICategory } from '../../services/slices/skill/skillSlice'
import { RegisterModal } from '@widgetComponents/RegisterModal'
import React, { useState } from 'react'
import { RegisterContextProvider } from '../../shared/contexts/RegisterContext/RegisterContext'
import styles from './styles.module.scss'

export const RegisterPage: React.FC = () => {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // TODO: Получить из слайса
  // Заглушка пользователя
  // const user: TUser = {
  //   id: '',
  //   email,
  //   password,
  //   name: '',
  //   description: '',
  //   avatar: '',
  //   subcategoriesWantToLearn: [],
  //   skillCanTeach: [],
  //   age: '20',
  //   gender: 'male',
  //   images:
  //   rating: 0,
  // }

  // // Заглушка категорий
  // const categories: ICategory[] = []

  // const handleUpdateUser = (field: keyof TUser, value: any) => {
  //   if (field === 'email')
  //     setEmail(value)
  // }

  // const handleSubmit = () => {}

  return (
    <RegisterContextProvider>
      <RegisterModal />
    </RegisterContextProvider>
  )
}
