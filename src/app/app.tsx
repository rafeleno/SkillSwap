import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React from 'react'
import { fetchSkills } from '../services/slices/skill/thunks'
import store from '../services/store'
import { AppRouter } from './router'
import { initFilterSettings } from '../services/slices/filter/filterSlice'
import users from '../../public/db/users.json'


export function App() {

  store.dispatch(fetchSkills())
  store.dispatch(initFilterSettings(users));

  return (
    <>
      <Header user={null} />
      <AppRouter />
      <Footer />
    </>
  )
}
