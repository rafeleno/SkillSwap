export interface NotificationProps {
  isNew: boolean
  notificationTitle: string
  notificationText: string
  notificationDate: string
  onClick?: () => void
}
