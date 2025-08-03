import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import { UserCardList } from '@widgetComponents/UserCardList'

import React from 'react'
import { selectUsers } from '../../services/slices/user/userSlice'
import { useSelector } from '../../services/store'
import styles from './styles.module.scss'

export const MainPage: React.FC = () => {
  // const initialFilters: FiltersState = {
  //   skill: [],
  //   gender: [],
  //   location: [],
  //   filterType: [],
  // }
  // const [filters, setFilters] = React.useState<FiltersState>(initialFilters)
  // console.error('filters', filters)

  // const handleFiltersChange = (filters: FiltersState) => {
  //   setFilters(filters)
  // }
  const users = useSelector(selectUsers)

  const popularUsers = users
    .filter(user => user.likes >= 50)
    .sort((a, b) => b.likes - a.likes) // чтобы самые лайкнутые были первыми
    .slice(0, 3)

  const newUsers = [...users]
    .sort((a, b) => Number(b.id) - Number(a.id)) // "новые" с бОльшим id
    .slice(0, 3)
  console.error('newUsers', newUsers)

  const getRecommendedUsers = (currentUser: TUser, allUsers: TUser[]) => {
    return allUsers.filter((user) => {
      return user.subcategoriesWantToLearn.some((subcat: any) =>
        subcat.skillId === currentUser.skillCanTeach?.skillId,
      )
    })
  }

  const currentUser = users[0]
  const recommendedUsers = getRecommendedUsers(currentUser, users).slice(0, 9)
  console.error('recommendedUsers', currentUser, recommendedUsers)

  return (
    <div className={styles.mainPage}>
      {/* <MainButton type="primary" onClick={() => setFilters(initialFilters)}>Сбросить фильтры</MainButton> */}
      {/* <FilterTab onFiltersChange={handleFiltersChange}></FilterTab> */}
      <UserCardList type="regular" title="Популярное" buttonText="Смотреть все" buttonIconId="chevron-right" users={popularUsers}></UserCardList>
      <UserCardList type="regular" title="Новое" buttonText="Смотреть все" buttonIconId="chevron-right" users={newUsers}></UserCardList>
      <UserCardList type="regular" title="Рекомендуем" buttonText="Смотреть все" buttonIconId="chevron-right" users={recommendedUsers}></UserCardList>
    </div>
  )
}
