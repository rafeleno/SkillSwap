import type { TNotification } from './notificationsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/db/notification.json')
      const data: TNotification[] = await response.json()
      return data
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
