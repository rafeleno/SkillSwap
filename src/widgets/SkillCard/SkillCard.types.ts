export interface SkillCardProps {
  type: 'edit' | 'view'
  title: string
  category: string
  description: string
  photos: string[]
  userId: string
}
