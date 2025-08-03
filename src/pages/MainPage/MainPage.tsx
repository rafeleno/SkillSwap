import type { FiltersState } from 'shared/hooks/useFilters'
import { MainButton } from '@uiComponents/MainButton'
import { FilterTab } from '@widgetComponents/FilterTab'
import { UserCardList } from '@widgetComponents/UserCardList'
import React, { useMemo } from 'react'

import users from '../../../public/db/users.json'
import styles from './styles.module.scss'

export const MainPage: React.FC = () => {
  const initialFilters: FiltersState = {
    skill: [],
    gender: [],
    location: [],
    filterType: [],
  }
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      if (filters.gender && user.gender !== filters.gender[0]) {
        return false
      }
      if (filters.location && !filters.locations.includes(user.location)) {
        console.log(user)
        return false
      }

      if (filters.filterType && filters.filterType[0] === 'wantToLearn') {
        console.log(user)

        return user.subcategoriesWantToLearn.some(sub =>
          filters.skillIds.includes(sub.skillId),
        )
      }

      if (filters.filterType && filters.filterType[0] === 'wantToTeach') {
        console.log(user)
        return filters.skillIds.includes(user.skillCanTeach.skillId)
      }

      return true // если режим "всё"
    })
  }, [users, filters])

  const handleFiltersChange = (filters: FiltersState) => {
    setFilters(filters)
  }
  // const mockUsers = JSON.parse(users)
  return (
    <div className={styles.mainPage}>
      {/* <MainButton type="primary" onClick={() => setFilters(initialFilters)}>Сбросить фильтры</MainButton> */}
      <FilterTab onFiltersChange={handleFiltersChange}></FilterTab>
      <UserCardList type="sorted" title="Подходящих предложений: " buttonText="Сначала новые" buttonIconId="sort" users={filteredUsers}></UserCardList>
    </div>
  )
}
