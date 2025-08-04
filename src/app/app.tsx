import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React, { useEffect } from 'react'
import { fetchUsers } from '../services/slices/user/thunks'
import { useDispatch, useSelector } from '../services/store'
import { AppRouter } from './router'

export function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers()).then((res) => {
      console.log(res)
    })
  }, [])
  return (
    <>
      <Header user={null} />
      <AppRouter />
      <Footer />
    </>
  )
}
