/* eslint-disable style/multiline-ternary */
import { Notification } from '@uiComponents/Notification'
import { NotificationBell } from '@uiComponents/NotificationBell'
import React, { useRef, useState } from 'react'
import { getNewNotifications, getReadNotifications } from '../../services/slices/notifications/notificationsSlice'
import { useSelector } from '../../services/store'
import { useClickOutside } from '../../shared/hooks/useClickOutside'

import styles from './styles.module.scss'

export const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const newNotifications = useSelector(getNewNotifications)
  const viewedNotifications = useSelector(getReadNotifications)

  const toggleDropdown = () => setIsOpen(prev => !prev)
  const closeDropdown = () => setIsOpen(false)

  useClickOutside(wrapperRef, () => {
    if (isOpen)
      closeDropdown()
  })

  return (
    <div ref={wrapperRef}>
      <NotificationBell
        onClick={toggleDropdown}
        isActive={newNotifications.length > 0}
      />

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.section}>
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>Новые уведомления</h2>
              <button className={styles.markAll}>Прочитать все</button>
            </div>

            {newNotifications.length > 0 ? (
              <div className={styles.notificationList}>
                {newNotifications.map(notification => (
                  <Notification
                    key={notification.id}
                    isNew={notification.isNew}
                    notificationTitle={
                      notification.type === 'offer'
                        ? `${notification.userName} предлагает вам обмен`
                        : `${notification.userName} принял ваш обмен`
                    }
                    notificationText={
                      notification.type === 'offer'
                        ? 'Примите обмен, чтобы обсудить детали'
                        : 'Перейдите в профиль, чтобы обсудить детали'
                    }
                    notificationDate={notification.date}
                    onClick={() => {
                      // логика перехода
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>Нет новых уведомлений</div>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>Просмотренные</h2>
              <button className={styles.clearAll}>Очистить</button>
            </div>

            {viewedNotifications.length > 0 ? (
              <div className={styles.notificationList}>
                {viewedNotifications.map(notification => (
                  <Notification
                    key={notification.id}
                    isNew={false}
                    notificationTitle={
                      notification.type === 'offer'
                        ? `${notification.userName} предлагает вам обмен`
                        : `${notification.userName} принял ваш обмен`
                    }
                    notificationText={
                      notification.type === 'offer'
                        ? 'Примите обмен, чтобы обсудить детали'
                        : 'Перейдите в профиль, чтобы обсудить детали'
                    }
                    notificationDate={notification.date}
                    onClick={() => {
                      // логика перехода
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.empty}>Нет просмотренных уведомлений</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
