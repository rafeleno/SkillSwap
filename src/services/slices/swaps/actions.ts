import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { initFilterSettings } from '../filter/filterSlice'

export const fetchSwaps = createAsyncThunk(
  'swaps/fetchSwaps',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/db/users.json')
      const data = await response.json()

      // Преобразуем данные, потом исправить any на TUser
      const transformed: TUser[] = data.map((user: any) => ({
        id: user.id,
        name: user.name,
        location: user.location,
        age: user.age,
        avatar: user.avatar,
        canTeach: user.skillCanTeach?.name ?? '',
        wantToLearn: user.subcategoriesWantToLearn.map((s: any) => s.name),
      }))

      thunkAPI.dispatch(initFilterSettings(transformed))
      return transformed
    }
    catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
