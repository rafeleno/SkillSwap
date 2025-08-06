import type { PayloadAction } from '@reduxjs/toolkit'
import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { RootState } from 'services/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'

import { fetchSwaps } from './actions'

interface TSwapsState {
  swaps: TUser[]
  loading: boolean
  error: string | null
}

const initialState: TSwapsState = {
  swaps: [],
  loading: false,
  error: null,
}

export const swapsSlice = createSlice({
  name: 'swaps',
  initialState,
  reducers: {
    addSwap: (state, action: PayloadAction<TUser>) => {
      state.swaps.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwaps.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchSwaps.fulfilled, (state, action: PayloadAction<TUser[]>) => {
        state.swaps = action.payload
        state.loading = false
      })
      .addCase(fetchSwaps.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })
  },

})

export const { addSwap } = swapsSlice.actions

export const getAllSwaps = (state: RootState): TUser[] => state.swaps.swaps
export function selectSwapById(id: string) {
  return createSelector([getAllSwaps], allSwaps =>
    allSwaps.find(swap => swap.id === id))
}
export default swapsSlice.reducer
