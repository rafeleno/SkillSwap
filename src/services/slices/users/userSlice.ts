import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { createSlice } from '@reduxjs/toolkit'
import { fetchUserData, saveUserData } from './thunks'

export interface User {
  id: string
  image: string
  name: string
  email: string
  data: string
  gender: 'male' | 'female' | 'Не указан'
  location: string
  city: string
  description: string
  favourites: string[]
  skillsToStudy: string[]
  skillsToLearn: string[]
  userSwap?: unknown
}

interface UserState {
  user: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  isAuthenticated: boolean
  token: string | null
}

const initialState: UserState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  status: 'idle',
  error: null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  token: localStorage.getItem('authToken'),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
      else {
        localStorage.removeItem('user')
      }
    },

    // Авторизация пользователя с сохранением в localStorage
    login: (state, action: PayloadAction<{ user: User, token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.status = 'succeeded'
      state.error = null

      // Сохраняем в localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('authToken', action.payload.token)
    },

    // // Выход пользователя с очисткой данных
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.status = 'idle'

      // Очищаем localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('authToken')
    },

    // Проверка статуса авторизации при загрузке приложения
    checkAuthStatus: (state) => {
      const token = localStorage.getItem('authToken')
      const user = localStorage.getItem('user')

      if (token && user) {
        try {
          state.user = JSON.parse(user)
          state.token = token
          state.isAuthenticated = true
        }
        catch {
          localStorage.removeItem('user')
          localStorage.removeItem('authToken')
          state.isAuthenticated = false
        }
      }
      else {
        state.isAuthenticated = false
      }
    },

    updateUserField: <K extends keyof User>(state: UserState, action: PayloadAction<{ field: K, value: User[K] }>) => {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    addToFavourites: (state, action: PayloadAction<string>) => {
      if (state.user && !state.user.favourites.includes(action.payload)) {
        state.user.favourites.push(action.payload)
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    removeFromFavourites: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.favourites = state.user.favourites.filter(id => id !== action.payload)
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
    resetUser: (state) => {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded'
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(saveUserData.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      // Исправлено: добавлена проверка payload и приведение типа для совместимости с thunk
      .addCase(saveUserData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        if (action.payload) {
          state.user = action.payload as User
          localStorage.setItem('user', JSON.stringify(action.payload))
        }
      })
      .addCase(saveUserData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

export const selectCurrentUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserError = (state: RootState) => state.user.error
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
export const selectAuthToken = (state: RootState) => state.user.token

export const {
  setUser,
  updateUserField,
  addToFavourites,
  removeFromFavourites,
  resetUser,
  login,
  logout,
  checkAuthStatus,
} = userSlice.actions

export default userSlice
