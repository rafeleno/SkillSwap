import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { RootState } from '../../store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok)
        throw new Error('Failed to fetch user data')
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data))
      return data
    }
    catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
) // переписать

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
