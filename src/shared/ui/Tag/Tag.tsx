import type { TagProps, TagVariant } from './Tag.types'
import React from 'react'
import styles from './styles.module.scss'

const TAG_CONFIG: Record<TagVariant, { text: string, colorClass: string }> = {
  // business_and_career - фиолетовый
  team_management: { text: 'Управление', colorClass: styles['tag-business'] },
  marketing_and_advertising: { text: 'Маркетинг', colorClass: styles['tag-business'] },
  sales_and_negotiation: { text: 'Продажи', colorClass: styles['tag-business'] },
  personal_brand: { text: 'Личный бренд', colorClass: styles['tag-business'] },
  resume_and_interview: { text: 'Резюме', colorClass: styles['tag-business'] },
  time_management: { text: 'Тайм-менеджмент', colorClass: styles['tag-business'] },
  project_management: { text: 'Проектное управление', colorClass: styles['tag-business'] },
  entrepreneurship: { text: 'Предпринимательство', colorClass: styles['tag-business'] },

  // foreign_languages - желтый
  english: { text: 'Английский', colorClass: styles['tag-languages'] },
  french: { text: 'Французский', colorClass: styles['tag-languages'] },
  spanish: { text: 'Испанский', colorClass: styles['tag-languages'] },
  german: { text: 'Немецкий', colorClass: styles['tag-languages'] },
  chinese: { text: 'Китайский', colorClass: styles['tag-languages'] },
  japanese: { text: 'Японский', colorClass: styles['tag-languages'] },
  exam_preparation: { text: 'IELTS, TOEFL', colorClass: styles['tag-languages'] },

  // home_and_comfort - коричневый
  cleaning_and_organization: { text: 'Уборка', colorClass: styles['tag-home'] },
  home_finances: { text: 'Домашние финансы', colorClass: styles['tag-home'] },
  cooking: { text: 'Приготовление еды', colorClass: styles['tag-home'] },
  houseplants: { text: 'Домашние растения', colorClass: styles['tag-home'] },
  repair: { text: 'Ремонт', colorClass: styles['tag-home'] },
  storage: { text: 'Хранение вещей', colorClass: styles['tag-home'] },

  // creativity_and_art - розовый
  drawing_and_illustration: { text: 'Рисование', colorClass: styles['tag-arts'] },
  photography: { text: 'Фотография', colorClass: styles['tag-arts'] },
  video_editing: { text: 'Видеомонтаж', colorClass: styles['tag-arts'] },
  music_and_sound: { text: 'Музыка и звук', colorClass: styles['tag-arts'] },
  acting: { text: 'Актёрское мастерство', colorClass: styles['tag-arts'] },
  creative_writing: { text: 'Креативное письмо', colorClass: styles['tag-arts'] },
  art_therapy: { text: 'Арт-терапия', colorClass: styles['tag-arts'] },
  decor_and_diy: { text: 'Декор и DIY', colorClass: styles['tag-arts'] },

  // education_and_development - голубой
  personal_development: { text: 'Личностное развитие', colorClass: styles['tag-education'] },
  learning_skills: { text: 'Навыки обучения', colorClass: styles['tag-education'] },
  cognitive_techniques: { text: 'Когнитивные техники', colorClass: styles['tag-education'] },
  speed_reading: { text: 'Скорочтение', colorClass: styles['tag-education'] },
  teaching_skills: { text: 'Преподавание', colorClass: styles['tag-education'] },
  coaching: { text: 'Коучинг', colorClass: styles['tag-education'] },

  // health_and_lifestyle - зеленый
  yoga_and_meditation: { text: 'Медитация', colorClass: styles['tag-health'] },
  nutrition_and_health: { text: 'Питание и ЗОЖ', colorClass: styles['tag-health'] },
  mental_health: { text: 'Здоровье души', colorClass: styles['tag-health'] },
  mindfulness: { text: 'Осознанность', colorClass: styles['tag-health'] },
  physical_training: { text: 'Спорт', colorClass: styles['tag-health'] },
  sleep_and_recovery: { text: 'Восстановление', colorClass: styles['tag-health'] },
  work_life_balance: { text: 'Баланс жизни', colorClass: styles['tag-health'] },
  // счетчик скрытых элементов
  more: { text: '', colorClass: styles['tag-more'] },
}

export const Tag = React.memo<TagProps>(({ variant, count, className = '' }) => {
  const config = TAG_CONFIG[variant]

  if (!config) {
    return null
  }

  const isCounter = variant === 'more'
  const content = isCounter ? `+${count}` : config.text

  if (isCounter && !count) {
    return null
  }

  return (
    <span
      className={`${styles.tag} ${config.colorClass} ${className}`}
      aria-label={isCounter ? `Ещё ${count} навыков` : config.text}
      title={isCounter ? `Ещё ${count} навыков` : config.text}
    >
      {content}
    </span>
  )
})
