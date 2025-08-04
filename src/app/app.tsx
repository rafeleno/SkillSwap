import React from 'react'
import users from '../../public/db/users.json'
import { initFilterSettings } from '../services/slices/filter/filterSlice'
import { fetchSkills } from '../services/slices/skill/thunks'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
  store.dispatch(fetchSkills())
  store.dispatch(initFilterSettings(users))

  return (
    <AppRouter />
  )
}
