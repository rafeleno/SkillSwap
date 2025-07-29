import type { SkillsIconProps } from './SkillsIcon.type'
import React from 'react'
import styles from './styles.module.scss'

const NAME_TO_COLOR: Record<SkillsIconProps['name'], string> = {
  book: '#E7F2F6',
  briefcase: '#EEE7F7',
  global: '#EBE5C5',
  home: '#F7EBE5',
  lifestyle: '#E9F7E7',
  palette: '#F7E7F2',
}

export const SkillsIcon: React.FC<SkillsIconProps> = ({ name }) => {
  const backgroundColor = NAME_TO_COLOR[name]

  return (
    <div className={styles.skillsIcon} style={{ backgroundColor }}>
      <svg>
        <use href={`#icon-${name}`} />
      </svg>
    </div>
  )
}
