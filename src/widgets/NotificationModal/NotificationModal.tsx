import type { NotificationModalProps } from './NotificationModal.types'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import styles from './styles.module.scss'

export const NotificationModal: React.FC<NotificationModalProps> = (
  { title, description, iconId },
) => {
  return (
    <div className={styles.notificationModal}>
      <div className={styles.iconWrapper}>
        <svg className={styles.icon}>
          <use href={`/sprites.svg#${iconId}`} />
        </svg>
      </div>
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.description}>{description}</span>
      <MainButton
        type="primary"
        onClick={() => {}}
      >
        Готово
      </MainButton>
    </div>
  )
}
