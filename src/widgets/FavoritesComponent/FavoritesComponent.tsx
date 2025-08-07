import type { FavoritesProps } from './FavoritesComponent.types'
import React from 'react'
import { selectCurrentUser, selectUsers } from '../../services/slices/user/userSlice'
import { useSelector } from '../../services/store'
import { useLikeHandler } from '../../shared/hooks/useLikeHandler'
import { UserCardList } from '../../widgets/UserCardList'
import styles from './styles.module.scss'

export const Favorites: React.FC<FavoritesProps> = () => {
  const handleLike = useLikeHandler()
  const users = useSelector(selectUsers) || []
  const currentUser = useSelector(selectCurrentUser) || null

  const favoriteUsers = users.filter(user => currentUser?.favourites?.includes(user.id)) || []

  return (
    <div className={styles.favorites}>
      <UserCardList type="regular" title="Избранное" buttonIconId="chevron-right" users={favoriteUsers} onLike={handleLike} />
    </div>
  )
}
