import { NotificationContent } from '@uiComponents/NotificationContent'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import error404 from '../../assets/images/modalImages/error-404.png'
import styles from './styles.module.scss'

export const NotFound404: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['not-found404']}>
      <NotificationContent title="Страница не найдена" description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже" isTwoButtons={true} onClose={() => navigate('/')} image={error404} />
    </div>
  )
}
