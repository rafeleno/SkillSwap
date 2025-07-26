export type InputType = 'password' | 'email' | 'edit' | 'regular'

export interface InputProps {
  type: InputType
  state: [string, React.Dispatch<React.SetStateAction<string>>]
  placeholder?: string
  label?: string
}
