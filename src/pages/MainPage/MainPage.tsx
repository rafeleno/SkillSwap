import type { FiltersState } from 'shared/hooks/useFilters'
import { MainButton } from '@uiComponents/MainButton'
import { FilterTab } from '@widgetComponents/FilterTab'
import { UserCardList } from '@widgetComponents/UserCardList'
import React from 'react'

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

  const handleFiltersChange = (filters: FiltersState) => {
    setFilters(filters)
  }
  // const mockUsers = JSON.parse(users)
  return (
    <div className={styles.mainPage}>
      {/* <MainButton type="primary" onClick={() => setFilters(initialFilters)}>Сбросить фильтры</MainButton> */}
      <FilterTab onFiltersChange={handleFiltersChange}></FilterTab>
      <UserCardList type="sorted" title="Подходящих предложений: " buttonText="Сначала новые" buttonIconId="sort" users={users}></UserCardList>
    </div>
  )
}
