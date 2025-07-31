export interface MainButtonProps {
  type: 'primary' | 'secondary' | 'tertiary' | 'fixed'
  children: React.ReactNode
  onClick: () => void
  leftIconId?: string
  rightIconId?: string
  disabled?: boolean
}
