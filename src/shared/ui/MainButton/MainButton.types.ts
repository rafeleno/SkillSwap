export interface MainButtonProps {
  type: 'primary' | 'secondary' | 'tertiary' | 'compact'
  children: React.ReactNode
  onClick: () => void
  leftIconId?: string
  rightIconId?: string
  disabled?: boolean
}
