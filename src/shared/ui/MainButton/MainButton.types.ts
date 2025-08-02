export interface MainButtonProps {
  type: 'primary' | 'secondary' | 'tertiary' | 'fixed' | 'compact'
  children: React.ReactNode
  onClick: () => void
  leftIconId?: string
  rightIconId?: string
  disabled?: boolean
}
