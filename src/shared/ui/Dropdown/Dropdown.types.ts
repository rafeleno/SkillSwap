import type React from 'react'

export interface DropdownOption {
  value: string
  label: string
  content?: React.ReactNode
}

export interface DropdownProps {
  id: string
  options: DropdownOption[]
  selectedValue?: string
  onSelect?: (value: string) => void
  label?: string
  placeholder?: string
  isExpanded: boolean
  onExpandToggle: () => void
  displayText?: string
  version?: 'default' | 'no-border'
  position?: 'absolute' | 'relative'
}
