import type { NotificationModalProps } from './NotificationModal.types'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import styles from './styles.module.scss'

export const NotificationModal: React.FC<NotificationModalProps> = (
  { title, description, iconId, onClose },
) => {
  return (
    <div
      className={styles.notificationModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
    >
      <div className={styles.iconWrapper}>
        <svg className={styles.icon} aria-hidden="true">
          <use href={`/sprites.svg#${iconId}`} />
        </svg>
      </div>
      <h2 id="notification-modal-title" className={styles.title}>{title}</h2>
      <span id="notification-modal-description" className={styles.description}>{description}</span>
      <MainButton
        type="primary"
        onClick={onClose}
      >
        Готово
      </MainButton>
    </div>
  )
}
