import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { fetchSkills } from '../services/slices/skill/thunks'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
  store.dispatch(fetchSkills())

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header user={null} />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </Provider>
  )
}
