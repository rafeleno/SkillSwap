import type { FavoritesProps } from './FavoritesComponent.types'
import { UserCardList } from '@widgetComponents/UserCardList'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser, selectUsers, toggleFavourites } from '../../services/slices/user/userSlice'
import { useDispatch, useSelector } from '../../services/store'
import styles from './styles.module.scss'

export const Favorites: React.FC<FavoritesProps> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const currentUser = useSelector(selectCurrentUser)
  const allUsers = useSelector(selectUsers) || []
  const favoriteUsers = allUsers.filter(user => currentUser?.favourites?.includes(user.id)) || []

  const handleCard = (userId: string) => {
    navigate(`/skills/${userId}`)
  }

  const handleLike = (userId: string) => {
    dispatch(toggleFavourites(userId))
  }

  return (
    <div className={styles.favorites}>
      <UserCardList onCardClick={handleCard} onLike={handleLike} type="regular" title="Избранное" buttonIconId="chevron-right" users={favoriteUsers} />
    </div>
  )
}
