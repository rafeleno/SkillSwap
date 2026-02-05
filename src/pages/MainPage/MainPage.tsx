import type { FiltersState } from 'shared/hooks/useFilters'
import { FiltersTags } from '@widgetComponents/FiltersTags'
import { FilterTab } from '@widgetComponents/FilterTab'
import { UserCardList } from '@widgetComponents/UserCardList'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../../services/slices/user/thunks'
import { selectUsers, selectUserStatus } from '../../services/slices/user/userSlice'
import { useDispatch, useSelector } from '../../services/store'
import { useLikeHandler } from '../../shared/hooks/useLikeHandler'
import styles from './styles.module.scss'

export const initialFilters: FiltersState = {
  skill: [],
  gender: ['notSpecified'],
  locations: [],
  filterType: ['all'],
}
export const MainPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(selectUsers)
  const userStatus = useSelector(selectUserStatus)

  const handleLike = useLikeHandler()

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers())
    }
  }, [userStatus, dispatch])

  const [filters, setFilters] = useState<FiltersState>(initialFilters)

  const filteredUsers = useMemo(() => {
    if (!users)
      return []
    return users.filter((user) => {
      // Фильтр по полу
      if (filters.gender[0] !== 'notSpecified' && user.gender !== filters.gender[0]) {
        return false
      }
      // Фильтр по локации
      if (filters.locations.length !== 0 && !filters.locations.includes(user.location.trim())) {
        return false
      }

      // Если навыки не выбраны — показываем всех (прошедших предыдущие фильтры)
      if (filters.skill.length === 0) {
        return true
      }

      const subcategoriesWantToLearnIds = user.subcategoriesWantToLearn.map(sub => sub.subcategoryId)

      // Фильтр по типу
      if (filters.filterType[0] === 'wantToLearn') {
        return filters.skill.includes(user.skillCanTeach.subcategoryId)
      }
      if (filters.filterType[0] === 'wantToTeach') {
        return filters.skill.some(id => subcategoriesWantToLearnIds.includes(id))
      }

      // Режим "всё" — показываем если совпадает хотя бы один навык
      return filters.skill.includes(user.skillCanTeach.subcategoryId)
        || filters.skill.some(id => subcategoriesWantToLearnIds.includes(id))
    })
  }, [users, filters])

  const handleFiltersChange = useCallback((filters: FiltersState) => {
    setFilters(prev => ({ ...prev, ...filters }))
  }, [])

  const popularUsers = useMemo(() => users
    .filter(user => user.likes >= 50)
    .sort((a, b) => b.likes - a.likes) // чтобы самые лайкнутые были первыми
    .slice(0, 3), [users])

  const newUsers = useMemo(() => [...users]
    .sort((a, b) => Number(b.id) - Number(a.id)) // "новые" с бОльшим id
    .slice(0, 3), [users])

  const recommendedUsers = useMemo(() => {
    // getRecommendedUsers logic inlined for clarity inside useMemo
    return users
      .filter(user => user.likes >= 30) // Фильтруем пользователей с достаточным количеством лайков
      .sort((a, b) => b.likes - a.likes) // Сортируем по убыванию лайков
      .slice(0, 9)
  }, [users])

  const handleCard = useCallback((userId: string) => {
    navigate(`/skills/${userId}`)
  }, [navigate])

  return (
    <div className={styles.mainPage}>
      <FilterTab onFiltersChange={handleFiltersChange} filters={filters} setFilters={setFilters}></FilterTab>
      {
        (filters.skill.length !== 0 || filters.locations.length !== 0)
        && (
          <div className={styles.filteredContainer}>
            <FiltersTags
              onFiltersChange={handleFiltersChange}
              filters={filters}
              setFilters={setFilters}
            />
            <UserCardList onCardClick={handleCard} type="sorted" title="Подходящих предложений" buttonText="Сначала новые" buttonIconId="sort" users={filteredUsers} counter={(filteredUsers.length).toString()}></UserCardList>
          </div>
        )
      }
      {
        (filters.skill.length === 0 && filters.locations.length === 0)
        && (
          <div className={styles['user-card-list__container']}>
            <UserCardList
              onCardClick={handleCard}
              onLike={handleLike}
              type="regular"
              title="Популярное"
              buttonText="Смотреть все"
              buttonIconId="chevron-right"
              users={popularUsers}
            >
            </UserCardList>
            <UserCardList
              onCardClick={handleCard}
              onLike={handleLike}
              type="regular"
              title="Новое"
              buttonText="Смотреть все"
              buttonIconId="chevron-right"
              users={newUsers}
            >
            </UserCardList>
            <UserCardList
              onCardClick={handleCard}
              onLike={handleLike}
              type="regular"
              title="Рекомендуем"
              buttonText="Смотреть все"
              buttonIconId="chevron-right"
              users={recommendedUsers}
            >
            </UserCardList>
          </div>
        )
      }
    </div>
  )
}
