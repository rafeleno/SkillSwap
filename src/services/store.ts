import type {
  TypedUseSelectorHook,
} from 'react-redux'

import { combineSlices, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'
import { usersSlice } from './slices/users/usersSlice'; 
import { notificationsSlice } from './slices/notifications/notificationsSlice';

const rootReducer = combineSlices(notificationsSlice, usersSlice)

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store
