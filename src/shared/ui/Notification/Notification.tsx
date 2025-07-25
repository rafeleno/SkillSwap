import type { NotificationProps } from './Notification.types'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import styles from './styles.module.scss'

export const Notification: React.FC<NotificationProps> = ({
  isNew,
  notificationTitle,
  notificationText,
  notificationDate,
  onClick = () => {},
}) => {
  return (
    <>
      <div className={styles.notificationContainer}>
        <div className={styles.notificationContent}>
          <div className={styles.notificationIconAndText}>
            <svg width="40" height="40" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <use href="/sprites.svg#idea" />
            </svg>
            <span>
              <p className={styles.notificationTitle}>{notificationTitle}</p>
              <p className={styles.notificationText}>{notificationText}</p>
            </span>
          </div>
          <span className={styles.notificationDate}>{notificationDate}</span>
        </div>
        {isNew && (
          <>
            <span className={styles.notificationButton}>
              <MainButton
                type="primary"
                children={<p className={styles.notificationButtonText}>Перейти</p>}
                onClick={onClick}
              />
            </span>
          </>
        )}
      </div>
    </>
  )
}
