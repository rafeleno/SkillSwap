import type { TUser } from '@widgetComponents/UserCard/UserCard.types'

export interface UserCardListProps {
  title: string
  users: TUser[]
  className?: string
  buttonText?: string
  onCardClick?: (userId: number) => void
  onLike?: (userId: number) => void
}
