import type { ProfileMenuProps } from './ProfileMenu.types'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import { selectCurrentUser, setUser } from '../../services/slices/user/userSlice'
import styles from './styles.module.scss'

export const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  const dispatch = useDispatch()
  const params = useParams<{ id: string, page: string }>()

  return (
    <div className={styles.profileMenu}>
      <div className={styles.profileMenuWrapper}>
        <MainButton type="fixed" leftIconId="request" onClick={() => {}}>Заявки</MainButton>
        <MainButton type="fixed" leftIconId="message-text" onClick={() => {}}>обмены</MainButton>
        <Link to={`/profile/${params.id}/favorites`}>
          <MainButton isActive={params.page === 'favorites'} type="fixed" leftIconId="like" onClick={() => {}}>Избранное</MainButton>
        </Link>
        <MainButton type="fixed" leftIconId="idea" onClick={() => {}}>Мои навыки</MainButton>
        <Link to={`/profile/${params.id}/data`}>
          <MainButton isActive={params.page === 'data'} type="fixed" leftIconId="user" onClick={() => {}}>Личные данные</MainButton>
        </Link>
      </div>
      <MainButton type="tertiary" onClick={() => dispatch(setUser())}>Выход</MainButton>
    </div>
  )
}
