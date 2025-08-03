import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectCurrentUser } from '../../../services/slices/user/userSlice'

interface ProtectedRouteProps {
  onlyUnAuth?: boolean
  children: React.ReactElement
}

const user = useSelector(selectCurrentUser)

export function ProtectedRoute({
  onlyUnAuth,
  children,
}: ProtectedRouteProps) {
  const isAuthenticated = user
  const location = useLocation()

  if (!onlyUnAuth && !isAuthenticated) {
    return <Navigate replace to="/login" state={{ from: location }} />
  }

  if (onlyUnAuth && isAuthenticated) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate replace to={from} />
  }

  return children
}
