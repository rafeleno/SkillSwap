export interface IOption {
  id: string
  value: string
}

export interface DropdownProps {
  options: IOption[]
  selectedOption: IOption | null
  onChange?: (option: IOption) => void
  label: string
  searchable: boolean
  width?: number
  height?: number
  bordered?: boolean
}
