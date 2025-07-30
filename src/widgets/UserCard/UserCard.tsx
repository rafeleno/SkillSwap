import type { TagVariant } from '../../shared/ui/Tag/Tag.types'
import type { UserCardProps } from './UserCard.types'
import { LikeButton } from '@uiComponents/LikeButton'
import { MainButton } from '@uiComponents/MainButton'
import { Tag } from '@uiComponents/Tag'
import React from 'react'
import styles from './styles.module.scss'

export const UserCard: React.FC<UserCardProps> = ({ User, onClick, onLike }) => {
  const { avatar, name, location, age, skillCanTeach, subcategoriesWantToLearn, id } = User

  const handleLike = () => onLike(id)

  return (
    <article
      className={styles.userCard}
      aria-label={`Карточка пользователя ${name}`}
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
          <Tag variant={skillCanTeach.subcategoryId as TagVariant} />
        </section>

        <section className={styles.section} aria-labelledby={`want-${id}`}>
          <h4 className={styles.label} id={`want-${id}`}>Хочет научиться:</h4>
          <div className={styles.wantTags}>
            {subcategoriesWantToLearn.slice(0, 2).map(skill => (
              <Tag key={skill.skillId + skill.name} variant={skill.subcategoryId as TagVariant} />
            ))}
            {subcategoriesWantToLearn.length > 2 && (
              <Tag variant="more" count={subcategoriesWantToLearn.length - 2} />
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
