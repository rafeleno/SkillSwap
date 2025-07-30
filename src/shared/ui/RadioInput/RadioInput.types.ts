export interface RadioInputProps {
  name: string
  checked: boolean
  children: React.ReactNode
  value?: string
  onChange: (value: string) => void
}
