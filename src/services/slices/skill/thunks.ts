import type { ICategory } from './skillSlice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSkills = createAsyncThunk<ICategory[], void>(
  'skills/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/db/skills.json')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ICategory[] = await response.json()
      return data
    }
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error occurred')
    }
  },
)

export const updateSkill = createAsyncThunk(
  'skills/updateSkill',
  async ({
    categoryId,
    skillId,
    newName,
  }: {
    categoryId: string
    skillId: string
    newName: string
  }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/skills/${skillId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return { categoryId, skillId, newName }
    }
    catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error occurred')
    }
  },
)
