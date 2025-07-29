import type React from 'react'

export interface CheckboxInputProps {
  children: React.ReactNode
  opened?: boolean
  active?: boolean
  options?: string[]
  onOpen?: (opened: boolean) => void
  onChange?: (active: boolean) => void
}
