import type { UserCardProps } from './UserCard.types'
import { LikeButton } from '@uiComponents/LikeButton'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import styles from './styles.module.scss'

export const UserCard: React.FC<UserCardProps> = ({ User, onClick, onLike }) => {
  const { avatar, name, location, age, skillCanTeach, subcategoriesWantToLearn, id } = User

  const handleLike = () => onLike(id)
  const skillClasses = {
    business_and_career: styles.businessAndCareer,
    health_and_lifestyle: styles.healthAndLifestyle,
    creativity_and_art: styles.creativityAndArt,
    education_and_development: styles.educationAndDevelopment,
    foreign_languages: styles.foreignLanguages,
    home_and_comfort: styles.homeAndComfort,
  }

  return (
    <div className={styles.userCard}>
      <div className={styles.header}>
        <img src={avatar} alt={name || 'Аватар пользователя'} className={styles.avatar} />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.meta}>
            {location}
            ,
            {' '}
            {age}
          </div>
        </div>
        <LikeButton className={styles.favorite} onClick={handleLike} />
      </div>
      <div className={styles.sections}>
        <div className={styles.section}>
          <h4 className={styles.label}>Может научить:</h4>
          <span className={`${styles.teachTag} ${skillClasses[skillCanTeach.skillId] || styles.defaultSkill}`}>{skillCanTeach.name}</span>
        </div>

        <div className={styles.section}>
          <h4 className={styles.label}>Хочет научиться:</h4>
          <div className={styles.wantTags}>
            {subcategoriesWantToLearn.slice(0, 2).map(skill => (
              <span key={skill.skillId} className={`${styles.wantTag} ${skillClasses[skill.skillId] || styles.defaultSkill}`}>{skill.name}</span>
            ))}
            {subcategoriesWantToLearn.length > 2 && (
              <span className={styles.moreTag}>
                {' '}
                +
                {subcategoriesWantToLearn.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
      <MainButton type="primary" onClick={onClick}>
        Подробнее
      </MainButton>
    </div>
  )
}
