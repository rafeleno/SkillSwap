import type { FavoritesProps } from './FavoritesComponent.types'
import React from 'react'
import { selectUsers } from '../../services/slices/user/userSlice'
import { useSelector } from '../../services/store'
import { useLikeHandler } from '../../shared/hooks/useLikeHandler'
import { UserCardList } from '../../widgets/UserCardList'
import styles from './styles.module.scss'

export const Favorites: React.FC<FavoritesProps> = () => {
  const handleLike = useLikeHandler()
  const users = useSelector(selectUsers)

  const favoriteUsers = users
    .filter(user => user.likes >= 50)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)

  return (
    <div className={styles.favorites}>
      <UserCardList type="regular" title="Избранное" buttonIconId="chevron-right" users={favoriteUsers} onLike={handleLike} />
    </div>
  )
}
