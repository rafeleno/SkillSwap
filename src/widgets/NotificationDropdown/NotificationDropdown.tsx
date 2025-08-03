import type { NotificationDropdownProps } from './NotificationDropdown.types'
import { Notification } from '@uiComponents/Notification'
import { NotificationBell } from '@uiComponents/NotificationBell'
import React, { useRef } from 'react'
import { getNewNotifications, getReadNotifications } from '../../services/slices/notifications/notificationsSlice'
import { useSelector } from '../../services/store'
import { useClickOutside } from '../../shared/hooks/useClickOutside'

import styles from './styles.module.scss'

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const newNotifications = useSelector(getNewNotifications)
  const viewedNotifications = useSelector(getReadNotifications)

  useClickOutside(wrapperRef, () => {
    if (isOpen)
      onClose()
  })

  return (
    <div ref={wrapperRef} className={styles['dropdown-wrapper']}>
      <NotificationBell
        onClick={onClick}
        isActive={newNotifications.length > 0}
      />

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.section}>
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>Новые уведомления</h2>
              <button className={styles['mark-all']}>Прочитать все</button>
            </div>

            {newNotifications.length > 0
              ? (
                  <div className={styles['notification-list']}>
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
                )
              : (
                  <div className={styles.empty}>Нет новых уведомлений</div>
                )}
          </div>

          <div className={styles.section}>
            <div className={styles.header}>
              <h2 className={styles.sectionTitle}>Просмотренные</h2>
              <button className={styles['clear-all']}>Очистить</button>
            </div>

            {viewedNotifications.length > 0
              ? (
                  <div className={styles['notification-list']}>
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
                )
              : (
                  <div className={styles.empty}>Нет просмотренных уведомлений</div>
                )}
          </div>
        </div>
      )}
    </div>
  )
}
