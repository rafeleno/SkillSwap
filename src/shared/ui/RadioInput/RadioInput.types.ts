export interface RadioInputProps {
  name: string
  checked: boolean
  children: React.ReactNode
  value?: string
  onChange: (filterKey?: string, filterId?: string) => void
  filterKey?: string
  filterId?: string
}
