type IconId = `#${string}`

export interface MainButtonProps {
  type: 'primary' | 'secondary' | 'tertiary'
  children: React.ReactNode
  onClick: () => void
  leftIconId?: IconId
  rightIconId?: IconId
  disabled?: boolean
}
