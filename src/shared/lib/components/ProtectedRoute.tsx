import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { selectCurrentUser } from '../../../services/slices/user/userSlice'

interface ProtectedRouteProps {
  onlyUnAuth?: boolean
  children: React.ReactElement
}

export function ProtectedRoute({
  onlyUnAuth,
  children,
}: ProtectedRouteProps) {
  const user = useSelector(selectCurrentUser)
  const location = useLocation()

  if (!onlyUnAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location }} />
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from?.pathname || '/'
    return <Navigate replace to={from} />
  }

  return children
}
