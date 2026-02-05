import type React from 'react'

export interface CheckboxInputProps {
  checked: boolean
  name: string
  onChange: (filterKey?: string, filterId?: string) => void
  filterKey?: string
  filterId?: string
  children: React.ReactNode
}
