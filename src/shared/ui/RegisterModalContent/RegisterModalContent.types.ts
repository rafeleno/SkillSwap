import type { useState } from 'react'
import type { InputType } from '../../ui/PrimaryTextInput/Input.types'
import { Category } from '@widgetComponents/SkillsPopup/SkillsPopup.types'
import { TUser } from '@widgetComponents/UserCard/UserCard.types'

export interface RegisterModalContentProps {
  onNext: () => void
}

export interface TInitialInputs {
  type: InputType
  placeholder: string
  label: string
}
