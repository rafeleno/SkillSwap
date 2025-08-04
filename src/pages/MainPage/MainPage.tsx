import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { FiltersState } from 'shared/hooks/useFilters'
import { FilterTab } from '@widgetComponents/FilterTab'
import { UserCardList } from '@widgetComponents/UserCardList'
import React, { useEffect, useMemo } from 'react'
import users from '../../../public/db/users.json'
// Должен отдавать слайс

import styles from './styles.module.scss'

export const initialFilters: FiltersState = {
  skill: [],
  gender: [],
  location: [],
  filterType: [],
}
export const MainPage: React.FC = () => {
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters)
  console.error('filters', filters)

  useEffect(() => {
    console.log('Filters changed:', filters)
  }, [filters])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (filters.gender && user.gender !== filters.gender[0]) {
        return false
      }
      if (filters.location && !filters.locations?.includes(user.location)) {
        return false
      }

      if (filters.filterType && filters.filterType[0] === 'wantToLearn') {
        return user.subcategoriesWantToLearn.some(sub =>
          filters.skillIds.includes(sub.skillId),
        )
      }

      if (filters.filterType && filters.filterType[0] === 'wantToTeach') {
        return filters.skillIds.includes(user.skillCanTeach.skillId)
      }

      return true // если режим "всё"
    })
  }, [users, filters])

  const handleFiltersChange = (filters: FiltersState) => {
    setFilters(prev => ({ ...prev, ...filters }))
  }
  // const users = useSelector(selectUsers)

  const popularUsers = users
    .filter(user => user.likes >= 50)
    .sort((a, b) => b.likes - a.likes) // чтобы самые лайкнутые были первыми
    .slice(0, 3)

  const newUsers = [...users]
    .sort((a, b) => Number(b.id) - Number(a.id)) // "новые" с бОльшим id
    .slice(0, 3)

  const getRecommendedUsers = (currentUser: TUser, allUsers: TUser[]) => {
    return allUsers.filter((user) => {
      return user.subcategoriesWantToLearn.some((subcat: any) =>
        subcat.skillId === currentUser.skillCanTeach?.skillId,
      )
    })
  }

  const currentUser = users[0] // TODO: изменить на текущего пользователя
  const recommendedUsers = getRecommendedUsers(currentUser, users).slice(0, 9)

  return (
    <div className={styles.mainPage}>
      <FilterTab onFiltersChange={handleFiltersChange}></FilterTab>
      {(filters.skill.length !== 0 || filters.location.length !== 0 || filters.gender.length !== 0 || filters.filterType.length !== 0) && (
        <UserCardList type="sorted" title="Подходящих предложений: " buttonText="Сначала новые" buttonIconId="sort" users={filteredUsers}></UserCardList>
      )}
      {(filters.skill.length === 0 && filters.location.length === 0 && filters.gender.length === 0 && filters.filterType.length === 0) && (
        <div className={styles['user-card-list__container']}>
          <UserCardList type="regular" title="Популярное" buttonText="Смотреть все" buttonIconId="chevron-right" users={popularUsers}></UserCardList>
          <UserCardList type="regular" title="Новое" buttonText="Смотреть все" buttonIconId="chevron-right" users={newUsers}></UserCardList>
          <UserCardList type="regular" title="Рекомендуем" buttonText="Смотреть все" buttonIconId="chevron-right" users={recommendedUsers}></UserCardList>
        </div>
      )}
    </div>
  )
}
