import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { FiltersState } from 'shared/hooks/useFilters'
import { FilterTab } from '@widgetComponents/FilterTab'
import { UserCardList } from '@widgetComponents/UserCardList'
import React, { useMemo, useState } from 'react'
// Должен отдавать слайс
import users from '../../../public/db/users.json'

import styles from './styles.module.scss'

export const initialFilters: FiltersState = {
  skill: [],
  gender: ['notSpecified'],
  locations: [],
  filterType: ['all'],
}
export const MainPage: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>(initialFilters)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (filters.gender[0] !== 'notSpecified' && user.gender !== filters.gender[0]) {
        return false
      }
      if (filters.locations.length !== 0 && !filters.locations.includes(user.location.trim())) {
        return false
      }
      if (filters.filterType[0] === 'wantToLearn' && !filters.skill.includes(user.skillCanTeach.subcategoryId)) {
        return false
      }
      const subcategoriesWantToLearnIds = user.subcategoriesWantToLearn.map(sub => sub.subcategoryId)
      if (filters.filterType[0] === 'wantToTeach' && !filters.skill.some(id => subcategoriesWantToLearnIds.includes(id))) {
        return false
      }
      // TODO: Возможно не работает
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
      <FilterTab onFiltersChange={handleFiltersChange} filters={filters} setFilters={setFilters}></FilterTab>
      {(filters.skill.length !== 0 || filters.locations.length !== 0 || filters.gender.length !== 0 || filters.filterType.length !== 0) && (
        <UserCardList type="sorted" title="Подходящих предложений" buttonText="Сначала новые" buttonIconId="sort" users={filteredUsers} counter={filteredUsers.length}></UserCardList>
      )}
      {(filters.skill.length === 0 && filters.locations.length === 0 && filters.gender.length === 0 && filters.filterType.length === 0) && (
        <div className={styles['user-card-list__container']}>
          <UserCardList type="regular" title="Популярное" buttonText="Смотреть все" buttonIconId="chevron-right" users={popularUsers}></UserCardList>
          <UserCardList type="regular" title="Новое" buttonText="Смотреть все" buttonIconId="chevron-right" users={newUsers}></UserCardList>
          <UserCardList type="regular" title="Рекомендуем" buttonText="Смотреть все" buttonIconId="chevron-right" users={recommendedUsers}></UserCardList>
        </div>
      )}
    </div>
  )
}
