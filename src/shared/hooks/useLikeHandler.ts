import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser, toggleFavourites } from "../../services/slices/user/userSlice";

export const useLikeHandler = () => {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleLike = (userId: string) => {
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу регистрации
      navigate('/register')
      return
    }

    // Если пользователь авторизован, выполняем toggleFavourites
    dispatch(toggleFavourites(userId))
  }

  return handleLike;
}