export interface ToastNotificationProps {
  toastNotificationText: string
  isHovered: boolean
  onClick: () => void
  onClose: (e: React.MouseEvent) => void
}
