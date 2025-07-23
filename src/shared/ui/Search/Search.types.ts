export interface SearchProps {
  value?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}
