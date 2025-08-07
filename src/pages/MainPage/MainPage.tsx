import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { FiltersState } from 'shared/hooks/useFilters'
import { FilterTab } from '@widgetComponents/FilterTab'
import { UserCardList } from '@widgetComponents/UserCardList'
import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchUsers } from '../../services/slices/user/thunks'
import { selectCurrentUser, selectUsers, selectUserStatus, toggleFavourites } from '../../services/slices/user/userSlice'
import { useDispatch, useSelector } from '../../services/store'
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
  const currentUser = useSelector(selectCurrentUser)

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
      // Режим фильтрации по типу "всё"
      if (filters.skill.includes(user.skillCanTeach.subcategoryId) || filters.skill.some(id => subcategoriesWantToLearnIds.includes(id))) {
        return true
      }
      return false
    })
  }, [users, filters])

  const handleFiltersChange = (filters: FiltersState) => {
    setFilters(prev => ({ ...prev, ...filters }))
  }

  const popularUsers = users
    .filter(user => user.likes >= 50)
    .sort((a, b) => b.likes - a.likes) // чтобы самые лайкнутые были первыми
    .slice(0, 3)

  const newUsers = [...users]
    .sort((a, b) => Number(b.id) - Number(a.id)) // "новые" с бОльшим id
    .slice(0, 3)

  const getRecommendedUsers = (currentUser: TUser | null, allUsers: TUser[]) => {
    // Если currentUser не существует, возвращаем топ пользователей по лайкам
    // if (!currentUser || !currentUser.skillCanTeach || !currentUser.skillCanTeach.skillId) {
    return allUsers
      .filter(user => user.likes >= 30) // Фильтруем пользователей с достаточным количеством лайков
      .sort((a, b) => b.likes - a.likes) // Сортируем по убыванию лайков
    // }

    // // Если currentUser есть, фильтруем по совпадению навыков
    // return allUsers.filter((user) => {
    //   return user.subcategoriesWantToLearn.some((subcat: any) =>
    //     subcat.skillId === currentUser.skillCanTeach?.skillId,
    //   )
    // })
  }

  const recommendedUsers = getRecommendedUsers(currentUser, users).slice(0, 9)

  const handleCard = (userId: string) => {
    navigate(`/skills/${userId}`)
  }

  const handleLike = (userId: string) => {
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate('/register')
      return
    }

    // Если пользователь авторизован, выполняем toggleFavourites
    dispatch(toggleFavourites(userId))
  }

  return (
    <div className={styles.mainPage}>
      <FilterTab onFiltersChange={handleFiltersChange} filters={filters} setFilters={setFilters}></FilterTab>
      {
        (filters.skill.length !== 0 || filters.locations.length !== 0)
        && (
          <UserCardList onCardClick={handleCard} type="sorted" title="Подходящих предложений" buttonText="Сначала новые" buttonIconId="sort" users={filteredUsers} counter={(filteredUsers.length).toString()}></UserCardList>
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
