import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { RootState } from '../../store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const saveUserData = createAsyncThunk(
  'user/saveData',
  async (userData: Partial<TUser>, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as RootState
      if (!user)
        throw new Error('User not initialized')
      const updatedUser = { ...user, ...userData }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return updatedUser
    }
    catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
) // удалить

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TUser, { getState, rejectWithValue }) => {
    try {
      const { user } = getState() as RootState
      if (user.user) {
        throw new Error('User is already registered')
      }
      else {
        localStorage.setItem('user', JSON.stringify(userData))
        return userData
      }
    }
    catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/db/users.json') // получаем TUser[]
      const data = await response.json()
      return data
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string, thunkAPI) => {
    try {
      const response = await fetch('/db/users.json')
      const users: TUser[] = await response.json()

      const user = users.find(u => u.id === userId)

      if (!user) {
        return thunkAPI.rejectWithValue('Пользователь не найден')
      }

      return user
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Ошибка загрузки пользователя')
    }
  },
)
