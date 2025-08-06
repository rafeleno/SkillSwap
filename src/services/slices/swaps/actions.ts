import { createAsyncThunk } from '@reduxjs/toolkit'
import { initFilterSettings } from '../filter/filterSlice'

export const fetchSwaps = createAsyncThunk(
  'swaps/fetchSwaps',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/db/users.json')
      const data = await response.json()
      return data
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
