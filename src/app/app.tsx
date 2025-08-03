import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../services/store'
import { AppRouter } from './router'

export function App() {
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
