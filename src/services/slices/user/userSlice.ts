import type { PayloadAction } from '@reduxjs/toolkit'
import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { RootState } from '../../store'
import { createSlice } from '@reduxjs/toolkit'
import { redirect } from 'react-router-dom'
import { fetchUserById, fetchUsers, registerUser } from './thunks'

interface UserState {
  users: TUser[] | null
  user: TUser | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UserState = {
  users: null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  status: 'idle',
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload
      if (action.payload) {
        localStorage.setItem('user', JSON.stringify(action.payload))
      }
      else {
        localStorage.removeItem('user')
      }
    },
    checkAuthStatus: (state) => {
      const user = localStorage.getItem('user')
      if (user) {
        try {
          state.user = JSON.parse(user)
        }
        catch {
          localStorage.removeItem('user')
          state.user = null
        }
      }
      else {
        state.user = null
      }
    },
    // Авторизация пользователя с сохранением в localStorage
    // login: (state, action: PayloadAction<{ user: TUser, token: string }>) => {
    //   state.user = action.payload.user
    //   state.token = action.payload.token
    //   state.isAuthenticated = true
    //   state.status = 'succeeded'
    //   state.error = null

    //   // Сохраняем в localStorage
    //   localStorage.setItem('user', JSON.stringify(action.payload.user))
    //   localStorage.setItem('authToken', action.payload.token)
    // },

    // // Выход пользователя с очисткой данных
    // logout: (state) => {
    //   state.user = null
    //   state.token = null
    //   state.isAuthenticated = false
    //   state.status = 'idle'

    //   // Очищаем localStorage
    //   localStorage.removeItem('user')
    //   localStorage.removeItem('authToken')
    // },

    // Проверка статуса авторизации при загрузке приложения

    login: (
      state,
      action: PayloadAction<{ email: string, password: string }>,
    ) => {
      const { email, password } = action.payload

      const user = state.users.find(
        u => u.email === email && u.password === password,
      )

      if (user) {
        state.user = user
        state.error = null
        localStorage.setItem('user', JSON.stringify(user))
      }
      else {
        state.error = 'Неверный email или пароль'
      }
    },

    logout: (state) => {
      state.user = null
      state.error = null
      localStorage.removeItem('user')
    },

    updateUserField: <K extends keyof TUser>(state: UserState, action: PayloadAction<{ field: K, value: TUser[K] }>) => {
      if (state.user) {
        state.user[action.payload.field] = action.payload.value
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },

    toggleFavourites: (state, action: PayloadAction<string>) => {
      if (state.user) {
        if (!state.user.favourites) {
          state.user.favourites = []
        }
        const index = state.user.favourites.indexOf(action.payload)
        if (index === -1) {
          state.user.favourites.push(action.payload)
        }
        else {
          state.user.favourites.splice(index, 1)
        }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TUser[]>) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.status = 'succeeded'
        state.user = action.payload
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload as string
      })
  },
})

// extraReducers: (builder) => {
//   builder
//     .addCase(fetchUserData.pending, (state) => {
//       state.status = 'loading'
//       state.error = null
//     })
//     .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<TUser>) => {
//       state.status = 'succeeded'
//       state.user = action.payload
//       localStorage.setItem('user', JSON.stringify(action.payload))
//     })
//     .addCase(fetchUserData.rejected, (state, action) => {
//       state.status = 'failed'
//       state.error = action.payload as string
//     })
//     .addCase(saveUserData.pending, (state) => {
//       state.status = 'loading'
//       state.error = null
//     })
//     // Исправлено: добавлена проверка payload и приведение типа для совместимости с thunk
//     .addCase(saveUserData.fulfilled, (state, action) => {
//       state.status = 'succeeded'
//       if (action.payload) {
//         state.user = action.payload as any as TUser
//         localStorage.setItem('user', JSON.stringify(action.payload))
//       }
//     })
//     .addCase(saveUserData.rejected, (state, action) => {
//       state.status = 'failed'
//       state.error = action.payload as string
//     })
//     .addCase(fetchUsers.rejected, (state, action) => {
//       state.error = action.payload as string
//     })
// },
// })

export const selectUsers = (state: RootState) => state.user.users
export const selectCurrentUser = (state: RootState) => state.user.user
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserError = (state: RootState) => state.user.error
export const selectFavourites = (state: RootState) => state.user.user?.favourites || []

export const {
  setUser,
  login,
  logout,
  checkAuthStatus,
  toggleFavourites,
  updateUserField,
} = userSlice.actions

export default userSlice
