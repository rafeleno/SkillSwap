interface Skill {
  id: number
  name: string
  description: string
}
interface TUser {
  id: number
  avatarUrl: string
  name: string
  location: string
  age: string // строка, типа "34 года"
  gender: 'Мужской' | 'Женский'
  skillCanTeach: Skill
  images: string[]
  subcategoriesWantToLearn: string[]
}
export interface UserCardProps {
  User: TUser
  onClick?: () => void
}
