import type { TSwap } from './swapsSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSwaps = createAsyncThunk(
  'swaps/fetchSwaps',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/db/users.json')
      const data = await response.json()

      // Преобразуем данные, потом исправить any на TUser
      const transformed: TSwap[] = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        location: user.location,
        age: user.age,
        avatar: user.avatar,
        canTeach: user.skillCanTeach?.name ?? '',
        wantToLearn: user.subcategoriesWantToLearn.map((s: any) => s.name),
      }))

      return transformed
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
