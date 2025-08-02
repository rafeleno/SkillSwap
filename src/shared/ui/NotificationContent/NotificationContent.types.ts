export interface NotificationContentProps {
  title: string
  description: string
  onClose: () => void
  iconId?: string
  image?: string
  isOneButton?: boolean
  isTwoButtons?: boolean
}
