export interface CheckboxParentInputProps {
  id: string
  checked: boolean
  name: string
  onChange: () => void
  openState: boolean
  setOpenState: (prev: any) => any
  children: React.ReactNode
}
