import type { UserCardListProps } from './UserCardList.types'
import { MainButton } from '@uiComponents/MainButton'
import { UserCard } from '@widgetComponents/UserCard'
import React from 'react'
import styles from './styles.module.scss'

export const UserCardList: React.FC<UserCardListProps> = ({
  title,
  users,
  className,
  buttonText = 'Смотреть все',
  onCardClick,
  onLike,
}) => {
  return (
    <section className={`${styles.userCardList} ${className}`} aria-label={title}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>

        <MainButton
          type="tertiary"
          aria-label={buttonText}
          onClick={onCardClick}
        >
          {buttonText}
        </MainButton>
      </header>

      <ul className={styles.grid} role="list">
        {users.map(user => (
          <li key={user.id} className={styles.gridItem}>
            <UserCard
              User={user}
              onClick={() => onCardClick?.(user.id)}
              onLike={onLike}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
