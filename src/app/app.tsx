import React, { useEffect } from 'react'
import users from '../../public/db/users.json'
import { initFilterSettings } from '../services/slices/filter/filterSlice'

import { fetchSkills } from '../services/slices/skill/thunks'
import { fetchSwaps } from '../services/slices/swaps/actions'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
  useEffect(() => {
    store.dispatch(fetchSkills())
    store.dispatch(initFilterSettings(users))
    store.dispatch(fetchSwaps())
  }, [store.dispatch])

  return (
    <AppRouter />
  )
}
