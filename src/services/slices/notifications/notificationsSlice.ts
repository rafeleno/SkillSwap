import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

interface TNotification {
  id: number
  type: 'offer' | 'accepted'
  userName: string
  date: string
  isNew: boolean
}

interface TNotificationsState {
  newNotifications: TNotification[]
  readNotifications: TNotification[]
}

const initialState: TNotificationsState = {
  newNotifications: [],
  readNotifications: [],
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
  selectors: {
    getNewNotifications: state => state.newNotifications,
    getReadNotifications: state => state.readNotifications,
  },
})

export const { addNotification, markAllAsRead, clearReadNotifications } = notificationsSlice.actions
export const { getNewNotifications, getReadNotifications } = notificationsSlice.selectors
export default notificationsSlice.reducer
