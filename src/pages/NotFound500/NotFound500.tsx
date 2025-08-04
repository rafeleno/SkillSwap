import { NotificationContent } from '@uiComponents/NotificationContent'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import error500 from '../../assets/images/modalImages/error-500.png'
import styles from './styles.module.scss'

export const NotFound500: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles['not-found500']}>
      <NotificationContent title="На сервере произошла ошибка" description="Попробуйте позже или вернитесь на главную страницу" isTwoButtons={true} onClose={() => navigate('/')} image={error500} />
    </div>
  )
}
