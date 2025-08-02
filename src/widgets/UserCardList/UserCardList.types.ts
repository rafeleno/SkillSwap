import type { TUser } from '@widgetComponents/UserCard/UserCard.types'

export interface UserCardListProps {
  type: 'regular' | 'sorted' | 'slider'
  title: string
  counter?: number
  users: TUser[]
  className?: string
  buttonText?: string
  buttonIconId?: string
  onButtonClick?: () => void
  onCardClick?: (userId: number) => void
  onLike?: (userId: number) => void
}
