// TODO: Вынести в общие
export interface Skill {
  skillId: string
  subcategoryId: string
  name: string
  description?: string
}
// TODO: Вынести в общие
export interface TUser {
  id: string
  avatar: string
  name: string
  location: string
  age: string // строка, типа "34 года"
  gender: string
  // TODO: Допитсать в базу данных description
  description?: string
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
