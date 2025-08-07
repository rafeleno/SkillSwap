import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { fetchNotifications } from './action'

export interface TNotification {
  id: number
  type: 'offer' | 'accepted'
  userName: string
  date: string
  isNew: boolean
}

interface TNotificationsState {
  newNotifications: TNotification[]
  readNotifications: TNotification[]
  loading: boolean
  error: string | null
}

const initialState: TNotificationsState = {
  newNotifications: [],
  readNotifications: [],
  loading: false,
  error: null,
}

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Добавить новое уведомление
    addNotification: (state, action: PayloadAction<TNotification>) => {
      state.newNotifications.push(action.payload)
    },

    markNotificationAsRead: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const notification = state.newNotifications.find(n => n.id === id)

      if (!notification)
        return

      state.newNotifications = state.newNotifications.filter(n => n.id !== id)
      state.readNotifications.unshift({ ...notification, isNew: false })
    },

    // Пометить все уведомления как прочитанные
    markAllAsRead: (state) => {
      const read = state.newNotifications.map(n => ({ ...n, isNew: false }))
      state.readNotifications = [...read, ...state.readNotifications]
      state.newNotifications = []
    },

    // Очистить просмотренные уведомления
    clearReadNotifications: (state) => {
      state.readNotifications = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<TNotification[]>) => {
        state.newNotifications = action.payload.filter(n => n.isNew)
        state.readNotifications = action.payload.filter(n => !n.isNew)
        state.loading = false
      })
      .addCase(fetchNotifications.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
  },
  selectors: {
    getNewNotifications: state => state.newNotifications,
    getReadNotifications: state => state.readNotifications,
  },
})

export const { addNotification, markAllAsRead, clearReadNotifications } = notificationsSlice.actions
export const { getNewNotifications, getReadNotifications } = notificationsSlice.selectors
export default notificationsSlice.reducer
