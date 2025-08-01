import type { useState } from 'react'
import type { Category } from 'services/slices/skill/skillSlice'
import type { User } from 'services/slices/users/userSlice'
import type { InputType } from '../../ui/PrimaryTextInput/Input.types'

export interface RegisterModalContentProps {
  type: 'stepOne' | 'stepTwo' | 'stepThree'
  onSubmit: () => void
  onPrev?: () => void
  user: User | null
  categories: Category[]
  onUpdateUser: (field: keyof User, value: any) => void

  // Локальные данные (только пароль)
  passwordState: ReturnType<typeof useState<string>>
}

export interface TInitialInputs {
  type: InputType
  placeholder: string
  label: string
}
