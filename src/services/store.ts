import type {
  TypedUseSelectorHook,
} from 'react-redux'

import { combineSlices, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'
import { notificationsSlice } from './slices/notifications/notificationsSlice'
import { swapsSlice } from './slices/swaps/swapsSlice'

const rootReducer = combineSlices(notificationsSlice, swapsSlice)

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store
