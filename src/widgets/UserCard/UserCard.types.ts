export interface Skill {
  skillId: string
  subcategoryId: string
  name: string
  description?: string
}
export interface TUser {
  id: number
  avatar: string
  name: string
  location: string
  age: string // строка, типа "34 года"
  gender: 'Мужской' | 'Женский'
  description: string
  skillCanTeach: Skill
  images: string[]
  subcategoriesWantToLearn: Skill[]
}
export interface UserCardProps {
  type: 'preview' | 'detailed'
  user: TUser
  onClick?: (userId: number) => void
  onLike: (userId: number) => void
}
