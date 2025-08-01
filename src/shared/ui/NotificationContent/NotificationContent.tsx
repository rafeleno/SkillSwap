import type { NotificationContentProps } from './NotificationContent.types'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import styles from './styles.module.scss'

export const NotificationContent: React.FC<NotificationContentProps> = ({ title, description, iconId, onClose, image, isOneButton, isTwoButtons }) => {
  return (
    <div className={styles['notification-content']}>
      {iconId && (
        <div className={styles['icon-wrapper']}>
          <svg className={styles.icon} aria-hidden="true">
            <use href={`#icon-${iconId}`} />
          </svg>
        </div>
      )}
      {image && (
        <div className={styles['image-wrapper']}>
          <img src={image} alt="error image" />
        </div>
      )}
      <h2 id="notification-modal-title" className={styles.title}>{title}</h2>
      <span id="notification-modal-description" className={styles.description}>{description}</span>
      {isOneButton && (
        <MainButton
          type="primary"
          onClick={onClose}
        >
          <span> Готово </span>
        </MainButton>
      )}
      {isTwoButtons && (
        <div className={styles['buttons-wrapper']}>
          <MainButton
            type="secondary"
            onClick={() => {}}
          >
            <span> Сообщить об ошибке</span>
          </MainButton>
          <MainButton
            type="primary"
            onClick={onClose}
          >
            <span> На главную </span>
          </MainButton>
        </div>
      )}
    </div>
  )
}
