import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCurrentUser, toggleFavourites } from '../../services/slices/user/userSlice'

export function useLikeHandler() {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const handleLike = useCallback((userId: string) => {
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      // replace: true чтобы модалка не попала в историю
      navigate('/register', { replace: true })
      return
    }

    // Если пользователь авторизован, выполняем toggleFavourites
    dispatch(toggleFavourites(userId))
  }, [currentUser, dispatch, navigate])

  return handleLike
}
