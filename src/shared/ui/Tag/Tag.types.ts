export type TagVariant
  // business_and_career
  = | 'team_management'
    | 'marketing_and_advertising'
    | 'sales_and_negotiation'
    | 'personal_brand'
    | 'resume_and_interview'
    | 'time_management'
    | 'project_management'
    | 'entrepreneurship'

  // foreign_languages
    | 'english'
    | 'french'
    | 'spanish'
    | 'german'
    | 'chinese'
    | 'japanese'
    | 'exam_preparation'

  // home_and_comfort
    | 'cleaning_and_organization'
    | 'home_finances'
    | 'cooking'
    | 'houseplants'
    | 'repair'
    | 'storage'

  // creativity_and_art
    | 'drawing_and_illustration'
    | 'photography'
    | 'video_editing'
    | 'music_and_sound'
    | 'acting'
    | 'creative_writing'
    | 'art_therapy'
    | 'decor_and_diy'

  // education_and_development
    | 'personal_development'
    | 'learning_skills'
    | 'cognitive_techniques'
    | 'speed_reading'
    | 'teaching_skills'
    | 'coaching'

  // health_and_lifestyle
    | 'yoga_and_meditation'
    | 'nutrition_and_health'
    | 'mental_health'
    | 'mindfulness'
    | 'physical_training'
    | 'sleep_and_recovery'
    | 'work_life_balance'
  // hidden skills
    | 'more'

export interface TagProps {
  variant: TagVariant
  className?: string
  // Используется, когда variant === 'more
  count?: number
}
