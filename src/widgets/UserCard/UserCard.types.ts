interface Skill {
  skillId: string
  subcategoryId: string
  name: string
  description?: string
}
interface TUser {
  id: number
  avatar: string
  name: string
  location: string
  age: string // строка, типа "34 года"
  gender: 'Мужской' | 'Женский'
  skillCanTeach: Skill
  images: string[]
  subcategoriesWantToLearn: Skill[]
}
export interface UserCardProps {
  User: TUser
  onClick: () => void
  onLike: (userId: number) => void
}
