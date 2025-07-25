import type { ToastNotificationProps } from './ToastNotification.types'
import React from 'react'
import styles from './styles.module.scss'

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  toastNotificationText,
  isHovered,
  onClick,
}) => {
  return (
    <>
      <div className={styles.toastNotificationContainer}>
        <span className={styles.toastNotificationCross}>
          <svg width="24" height="24" viewBox="0 0 11 10" fill="#253017" xmlns="http://www.w3.org/2000/svg">
            <use href="/sprites.svg#cross" />
          </svg>
        </span>
        <div className={styles.toastNotificationContent}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="/sprites.svg#idea" />
          </svg>
          <p className={styles.toastNotificationText}>{toastNotificationText}</p>
        </div>
        {isHovered
          && (
            <>
              <button
                className={styles.toastNotificationButton}
                onClick={onClick}
              >
                Перейти
              </button>
            </>
          )}
      </div>
    </>
  )
}
