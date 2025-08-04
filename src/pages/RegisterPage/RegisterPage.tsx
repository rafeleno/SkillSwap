import type { Category } from '../../services/slices/skill/skillSlice'
import type { User } from '../../services/slices/users/userSlice'
import React, { useState } from 'react'
import { RegisterModalContent } from '../../shared/ui/RegisterModalContent'

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Заглушка пользователя
  const user: User = {
    id: '',
    email,
    name: '',
    description: '',
    avatar: '',
    categories: [],
    rating: 0,
  }

  // Заглушка категорий
  const categories: Category[] = []

  const handleUpdateUser = (field: keyof User, value: any) => {
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
