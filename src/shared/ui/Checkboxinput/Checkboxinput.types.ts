import type React from 'react'

export interface CheckboxInputProps {
  checked: boolean
  name: string
  onChange: () => void
  children: React.ReactNode
}
