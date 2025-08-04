import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { ICategory } from '../../services/slices/skill/skillSlice'
import React, { useState } from 'react'
import { RegisterModalContent } from '../../shared/ui/RegisterModalContent'

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Заглушка пользователя
  const user: TUser = {
    id: '',
    email,
    name: '',
    description: '',
    avatar: '',
    categories: [],
    rating: 0,
  }

  // Заглушка категорий
  const categories: ICategory[] = []

  const handleUpdateUser = (field: keyof TUser, value: any) => {
    if (field === 'email')
      setEmail(value)
  }

  const handleSubmit = () => {}

  return (
    <RegisterModalContent
      type="stepOne"
      user={user}
      onUpdateUser={handleUpdateUser}
      passwordState={[password, setPassword]}
      onSubmit={handleSubmit}
      categories={categories}
    />
  )
}
