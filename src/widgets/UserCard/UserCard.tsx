import type { TagVariant } from '../../shared/ui/Tag/Tag.types'
import type { UserCardProps } from './UserCard.types'
import { LikeButton } from '@uiComponents/LikeButton'
import { MainButton } from '@uiComponents/MainButton'
import { Tag } from '@uiComponents/Tag'
import React from 'react'
import styles from './styles.module.scss'

export const UserCard: React.FC<UserCardProps> = ({ type, user, onClick, onLike }) => {
  const { avatar, name, location, age, description, skillCanTeach, subcategoriesWantToLearn, id } = user

  const handleLike = () => onLike(id)
  const handleButtonClick = () => onClick(id)

  return (
    <article
      className={`${styles.userCard} ${type === 'detailed' && styles.userCardDetailed}`}
      aria-label={`Карточка пользователя ${name}`}
    >
      <section>
        <header className={styles.header} aria-label={`Основные данные пользователя ${name}`}>
          <img
            src={avatar}
            alt={`Фото пользователя ${name}`}
            className={styles.avatar}
          />
          <div className={styles.info}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.meta} aria-label="Город проживания и возраст пользователя">{`${location}, ${age}`}</p>
          </div>
          {type === 'preview' && (
            <LikeButton
              className={styles.favorite}
              onClick={handleLike}
              aria-label={`Добавить ${name} в избранное`}
            />
          )}
        </header>
        {type === 'detailed' && (<p className={styles.description} aria-label="Информация о себе">{description}</p>)}
      </section>

      <div className={`${styles.sections} ${type === 'detailed' && styles.sectionsDetailed}`}>
        <section className={`${styles.section} ${type === 'detailed' && styles.sectionDetailed}`} aria-labelledby={`teach-${id}`}>
          <h4 className={styles.label} id={`teach-${id}`}>Может научить:</h4>
          <Tag variant={skillCanTeach.subcategoryId as TagVariant} />
        </section>

        <section className={`${styles.section} ${type === 'detailed' && styles.sectionDetailed}`} aria-labelledby={`want-${id}`}>
          <h4 className={styles.label} id={`want-${id}`}>Хочет научиться:</h4>
          <div className={styles.wantTags}>
            {subcategoriesWantToLearn.slice(0, 2).map(skill => (
              <Tag key={skill.skillId + skill.name} variant={skill.subcategoryId as TagVariant} />
            ))}
            {type !== 'detailed' && (subcategoriesWantToLearn.length > 2 && (
              <Tag variant="more" count={subcategoriesWantToLearn.length - 2} />
            ))}
          </div>
        </section>
      </div>

      {type === 'preview' && (
        <MainButton
          type="primary"
          onClick={handleButtonClick}
          aria-label={`Открыть профиль ${name}`}
        >
          Подробнее
        </MainButton>
      )}
    </article>
  )
}
