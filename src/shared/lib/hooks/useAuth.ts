import type { User } from '../../../services/slices/users/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkAuthStatus,
  login,
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
  selectUserStatus,
} from '../../../services/slices/users/userSlice'

export function useAuth() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectUserStatus) === 'loading'

  // Проверяем авторизацию при первой загрузке
  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])

  const handleLogin = (userData: User, token: string) => {
    dispatch(login({ user: userData, token }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  }
}
