export interface IOption {
  id: string
  value: string
}

export interface DropdownProps {
  options: IOption[]
  selectedOption: IOption | IOption[] | null // может содержать массив в случае работы с массивами
  onChange: (option: IOption | IOption[]) => void
  label: string
  searchable: boolean
  width?: number | string
  height?: number
  bordered?: boolean
  isCheckbox?: boolean
  placeholder?: string
}
