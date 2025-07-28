import type React from 'react'

export interface CheckboxInputProps {
  children: React.ReactNode
  active?: boolean
  options?: string[]
  onChange?: () => void
}
