import type { useState } from 'react'

export interface LoginProps {
  onSubmit: () => void
  onRegister: () => void
  onForgetPassword: () => void
  emailState: ReturnType<typeof useState<string>>
  passwordState: ReturnType<typeof useState<string>>
}
