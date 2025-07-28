import type { InputType } from '@uiComponents/PrimaryTextInput/Input.types'
import type { useState } from 'react'

export interface RegisterModalContentProps {
  type: 'stepOne' | 'stepTwo' | 'stepThree'
  onSubmit: () => void
  emailState: ReturnType<typeof useState<string>>
  passwordState: ReturnType<typeof useState<string>>
}

export interface TInitialInputs {
  type: InputType
  placeholder: string
  label: string
}
