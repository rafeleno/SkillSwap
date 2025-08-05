import educationIcon from '../../assets/svg/categories/book.svg'
import businessIcon from '../../assets/svg/categories/briefcase.svg'
import languagesIcon from '../../assets/svg/categories/global.svg'
import homeIcon from '../../assets/svg/categories/home.svg'
import healthIcon from '../../assets/svg/categories/lifestyle.svg'
import artIcon from '../../assets/svg/categories/palette.svg'

export const CATEGORY_ICONS = {
  business: businessIcon,
  languages: languagesIcon,
  home: homeIcon,
  art: artIcon,
  education: educationIcon,
  health: healthIcon,
} as const

export type CategoryId = keyof typeof CATEGORY_ICONS
