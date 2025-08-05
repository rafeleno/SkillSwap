import React from 'react'
import { fetchSkills } from '../services/slices/skill/thunks'
import { fetchSwaps } from '../services/slices/swaps/actions'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
  store.dispatch(fetchSkills())
  store.dispatch(fetchSwaps())

  return (
    <AppRouter />
  )
}
