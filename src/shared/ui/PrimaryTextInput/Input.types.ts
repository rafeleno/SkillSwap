import type { useState } from 'react'

export type InputType = 'password' | 'email' | 'edit' | 'regular'

export interface InputProps {
  type: InputType
  state: ReturnType<typeof useState<string>>
  placeholder?: string
  label?: string
}
