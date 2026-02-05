export interface CheckboxParentInputProps {
  id: string
  checked: boolean
  name: string
  onChange: (filterKey?: string, filterId?: string) => void
  filterKey?: string
  filterId?: string
  openState: boolean
  setOpenState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
  children: React.ReactNode
}
