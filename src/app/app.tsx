import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React, { useEffect } from 'react'
import { fetchUsers } from '../services/slices/user/thunks'
import { selectUsers } from '../services/slices/user/userSlice'
import { useDispatch, useSelector } from '../services/store'
import { AppRouter } from './router'

export function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])
  const users = useSelector(selectUsers)
  console.error('users', users)
  return (
    <>
      <Header user={null} />
      <AppRouter />
      <Footer />
    </>
  )
}
