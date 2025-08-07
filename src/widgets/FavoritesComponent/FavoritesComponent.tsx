import type { FavoritesProps } from './FavoritesComponent.types'
import React from 'react'

import users from '../../../public/db/users.json'
import styles from './styles.module.scss'
import { UserCardList } from '../../widgets/UserCardList'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'services/store'
import { selectCurrentUser, toggleFavourites } from 'services/slices/user/userSlice'
import { useLikeHandler } from '../../shared/hooks/useLikeHandler'

export const Favorites: React.FC<FavoritesProps> = () => {
  const handleLike = useLikeHandler();

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
