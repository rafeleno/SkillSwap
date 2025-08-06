import type { FavoritesPageProps } from './FavoritesPage.types'
import { ProfileMenu } from '@widgetComponents/ProfileMenu'
import { UserCardList } from '@widgetComponents/UserCardList'
import React from 'react'

import users from '../../../public/db/users.json'
import styles from './styles.module.scss'

export const FavoritesPage: React.FC<FavoritesPageProps> = () => {
  const favoriteUsers = users
    .filter(user => user.likes >= 50)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)

  return (
    <div className={styles.favoritesPage}>
      <ProfileMenu />
      <UserCardList type="regular" title="Избранное" buttonIconId="chevron-right" users={favoriteUsers} />
    </div>
  )
}
