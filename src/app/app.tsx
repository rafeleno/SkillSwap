import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React from 'react'
import { fetchSkills } from '../services/slices/skill/thunks'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
  store.dispatch(fetchSkills())

  return (
    <>
      <Header user={null} />
      <AppRouter />
      <Footer />
    </>
  )
}
