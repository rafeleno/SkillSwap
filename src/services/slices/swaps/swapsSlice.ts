import type { PayloadAction } from '@reduxjs/toolkit'
import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import { createSlice } from '@reduxjs/toolkit'
import { fetchSwaps } from './actions'

// export interface TSwap {
//   id: string
//   name: string
//   location: string
//   age: string
//   avatar: string
//   canTeach: string
//   wantToLearn: string[]
// }

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
  selectors: {
    getAllSwaps: state => state.swaps,
    getSwapById: (state, id) => state.swaps.find(swap => swap.id === id),
  },
})

export const { addSwap } = swapsSlice.actions
export const { getAllSwaps, getSwapById } = swapsSlice.selectors
export default swapsSlice.reducer
