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
      <div
        className={styles.notificationContainer}
        aria-label="Уведомление"
      >
        <div
          className={styles.notificationContent}
          aria-hidden="true"
        >
          <div className={styles.notificationIconAndText}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
            >
              <use href="/sprites.svg#idea" />
            </svg>
            <span>
              <h4 className={styles.notificationTitle}>{notificationTitle}</h4>
              <p className={styles.notificationText}>{notificationText}</p>
            </span>
          </div>
          <span className={styles.notificationDate}>{notificationDate}</span>
        </div>
        {isNew && (
          // span необходим, чтобы ограничить размеры кнопки - она занимает 100% ширины родителя
          <span className={styles.notificationButton}>
            <MainButton
              type="primary"
              onClick={onClick}
              aria-label={`Перейти к уведомлению: ${notificationTitle}`}
            >
              <p className={styles.notificationButtonText}>Перейти</p>
            </MainButton>
          </span>
        )}
      </div>
    </>
  )
}
