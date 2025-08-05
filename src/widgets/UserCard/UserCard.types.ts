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
  likes: number
  description: string
  skillCanTeach: Skill
  images: string[]
  subcategoriesWantToLearn: Skill[]
  favourites?: string[]
}

export interface UserCardProps {
  type: 'preview' | 'detailed'
  user: TUser
  onClick?: (userId: string) => void
  onLike?: (userId: string) => void
}
