import React, { useEffect } from 'react'
import { initFilterSettings } from '../services/slices/filter/filterSlice'

import { fetchSkills } from '../services/slices/skill/thunks'
import { fetchSwaps } from '../services/slices/swaps/actions'
import { fetchUsers } from '../services/slices/user/thunks'
import { selectUsers } from '../services/slices/user/userSlice'
import { useDispatch, useSelector } from '../services/store'
import { AppRouter } from './router'

export function App() {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  console.error('App component initialized with users:', users) // юзеры в консоль выводятся

  // должно быть такое
  useEffect(() => {
    const initApp = async () => {
      // получаем пользователей
      const result = await dispatch(fetchUsers())

      // ждем, пока загрузка пройдет успешно
      if (fetchUsers.fulfilled.match(result)) {
        // users ещё не обновлён, используем из result.payload
        dispatch(initFilterSettings(result.payload))
      }
      else {
        console.error('Ошибка при загрузке пользователей:', result)
      }

      dispatch(fetchSkills())
      dispatch(fetchSwaps())
    }

    initApp()
  }, [dispatch])

  return (
    <AppRouter />
  )
}
