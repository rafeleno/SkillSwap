import businessIcon from '../../assets/svg/categories/briefcase.svg';
import languagesIcon from '../../assets/svg/categories/global.svg';
import homeIcon from '../../assets/svg/categories/home.svg';
import artIcon from '../../assets/svg/categories/palette.svg';
import educationIcon from '../../assets/svg/categories/book.svg';
import healthIcon from '../../assets/svg/categories/lifestyle.svg';


export const CATEGORY_ICONS = {
  business_and_career: businessIcon,
  foreign_languages: languagesIcon,
  home_and_comfort: homeIcon,
  creativity_and_art: artIcon,
  education_and_development: educationIcon,
  health_and_lifestyle: healthIcon,
} as const;

export type CategoryId = keyof typeof CATEGORY_ICONS;