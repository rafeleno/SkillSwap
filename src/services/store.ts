import type {
  TypedUseSelectorHook,
} from 'react-redux'

import { combineSlices, configureStore } from '@reduxjs/toolkit'
import {
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux'
import { filterSlice } from './slices/filter/filterSlice'
import { notificationsSlice } from './slices/notifications/notificationsSlice'
import { skillsSlice } from './slices/skill/skillSlice'
import { swapsSlice } from './slices/swaps/swapsSlice'
import { userSlice } from './slices/user/userSlice'

const rootReducer = combineSlices(notificationsSlice, skillsSlice, userSlice, filterSlice, swapsSlice)

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = dispatchHook
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export default store
