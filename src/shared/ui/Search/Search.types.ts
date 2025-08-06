import type { TUser } from '@widgetComponents/UserCard/UserCard.types'

export interface SearchProps {
  user: TUser | null
  value?: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}
