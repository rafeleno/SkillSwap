import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface ProtectedRouteProps {
  onlyUnAuth?: boolean
  children: React.ReactElement
}

export function ProtectedRoute({
  onlyUnAuth,
  children,
}: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
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
