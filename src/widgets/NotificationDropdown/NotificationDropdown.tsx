import type { NotificationDropdownProps } from './NotificationDropdown.types'
import { Notification } from '@uiComponents/Notification'
import { NotificationBell } from '@uiComponents/NotificationBell'
import React, { useEffect, useRef } from 'react'
import { fetchNotifications } from '../../services/slices/notifications/action'
import { clearReadNotifications, getNewNotifications, getReadNotifications, markAllAsRead } from '../../services/slices/notifications/notificationsSlice'
import { useDispatch, useSelector } from '../../services/store'
import { useClickOutside } from '../../shared/hooks/useClickOutside'
import styles from './styles.module.scss'

// Функция для перемешивания массива уведомлений
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  isOpen,
  onClose,
  onClick,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const newNotifications = useSelector(getNewNotifications)
  const viewedNotifications = useSelector(getReadNotifications)

  useClickOutside(wrapperRef, () => {
    if (isOpen)
      onClose()
  })

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNotifications())
    }
  }, [isOpen, dispatch])

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }

  const handleClearReadNotifications = () => {
    dispatch(clearReadNotifications())
  }

  // Перемешиваем уведомления и берем первые 2
  const randomNewNotifications = shuffleArray([...newNotifications]).slice(0, 2)
  const randomViewedNotifications = shuffleArray([...viewedNotifications]).slice(0, 2)

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
              <button className={styles['mark-all']} onClick={handleMarkAllAsRead}>Прочитать все</button>
            </div>

            {newNotifications.length > 0
              ? (
                  <div className={styles['notification-list']}>
                    {randomNewNotifications.map(notification => (
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
              <button className={styles['clear-all']} onClick={handleClearReadNotifications}>Очистить</button>
            </div>

            {viewedNotifications.length > 0
              ? (
                  <div className={styles['notification-list']}>
                    {randomViewedNotifications.map(notification => (
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
