import type { NotificationBellProps } from './NotificationBell.types'
import React from 'react'
import styles from './styles.module.scss'

export const NotificationBell: React.FC<NotificationBellProps> = ({ onClick, isActive = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${isActive ? styles.active : ''}`}
      aria-label="Уведомления"
    >
      <svg className={styles.icon} aria-hidden="true">
        <use
          href="/sprites.svg#notification"
          className={isActive ? styles.active : ''}
        />
      </svg>
    </button>
  )
}
