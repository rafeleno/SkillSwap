import type { UserCardProps } from './UserCard.types'
import React from 'react'
import styles from './styles.module.scss'

export const UserCard: React.FC<UserCardProps> = () => {
  return (
    <div className={styles.userCard}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          {url}
          {' '}
        </div>
        <div className={styles.name}>
          {name}
          {' '}
        </div>
        <div className={styles.name}>
          {name}
          {' '}
        </div>
      </div>
    </div>

  )
}
