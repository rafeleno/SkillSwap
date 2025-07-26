import type { ToastNotificationProps } from './ToastNotification.types'
import React from 'react'
import styles from './styles.module.scss'

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toastNotificationText,
  isHovered,
  onClick,
  onClose,
}) => {
  return (
    <div className={styles.toastNotificationContainer}>
      <button
        className={styles.toastNotificationCross}
        type="button"
        onClick={onClose}
        aria-label="Закрыть всплывающие уведомление"
      >
        <svg width="10" height="10" viewBox="7 7 10 10" fill="#253017" xmlns="http://www.w3.org/2000/svg">
          <use href="/sprites.svg#cross" transform="scale(2.4)" />
        </svg>
      </button>
      <div className={styles.toastNotificationContent}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <use href="/sprites.svg#idea" />
        </svg>
        <p className={styles.toastNotificationText}>{toastNotificationText}</p>
      </div>
      {isHovered
        && (
          <button
            type="button"
            className={styles.toastNotificationButton}
            onClick={onClick}
            aria-label={`Перейти к уведомлению: ${toastNotificationText}`}
          >
            Перейти
          </button>
        )}
    </div>
  )
}
