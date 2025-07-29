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
    <article
      className={styles.userCard}
      aria-label={`Карточка пользователя ${name}`}
      role="region"
      tabIndex={0}
    >
      <header className={styles.header}>
        <img
          src={avatar}
          alt={`Фото пользователя ${name}`}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.meta}>
            {location}
            ,
            {' '}
            {age}
          </p>
        </div>
        <LikeButton
          className={styles.favorite}
          onClick={handleLike}
          aria-label={`Добавить ${name} в избранное`}
        />
      </header>

      <div className={styles.sections}>
        <section className={styles.section} aria-labelledby={`teach-${id}`}>
          <h4 className={styles.label} id={`teach-${id}`}>Может научить:</h4>
          <span
            className={`${styles.teachTag} ${skillClasses[skillCanTeach.skillId] || styles.defaultSkill}`}
            role="text"
          >
            {skillCanTeach.name}
          </span>
        </section>

        <section className={styles.section} aria-labelledby={`want-${id}`}>
          <h4 className={styles.label} id={`want-${id}`}>Хочет научиться:</h4>
          <div className={styles.wantTags}>
            {subcategoriesWantToLearn.slice(0, 2).map(skill => (
              <span
                key={skill.skillId + skill.name}
                className={`${styles.wantTag} ${skillClasses[skill.skillId] || styles.defaultSkill}`}
                role="text"
              >
                {skill.name}
              </span>
            ))}
            {subcategoriesWantToLearn.length > 2 && (
              <span className={styles.moreTag}>
                +
                {subcategoriesWantToLearn.length - 2}
              </span>
            )}
          </div>
        </section>
      </div>

      <MainButton
        type="primary"
        onClick={onClick}
        aria-label={`Открыть профиль ${name}`}
      >
        Подробнее
      </MainButton>
    </article>
  )
}
