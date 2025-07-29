import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type FilterType = 'Могу научить' | 'Хочу научиться' | 'Всё'
type Gender = 'male' | 'female' | 'Не указан'

interface FilterSettings {
  filterType: FilterType
  gender: Gender
  cities: string[]
  skills: string[]
  searchTerm: string
}

const initialSettings: FilterSettings = {
  filterType: 'Всё',
  gender: 'Не указан',
  cities: [],
  skills: [],
  searchTerm: '',
}

const filterSlice = createSlice({
  name: 'filterSettings',
  initialState: initialSettings,
  reducers: {
    updateFilterType: (state, { payload }: PayloadAction<FilterType>) => {
      state.filterType = payload
    },
    updateGenderFilter: (state, { payload }: PayloadAction<Gender>) => {
      state.gender = payload
    },
    toggleCitySelection: (state, { payload }: PayloadAction<string>) => {
      state.cities = state.cities.includes(payload)
        ? state.cities.filter(city => city !== payload)
        : [...state.cities, payload]
    },
    toggleSkillSelection: (state, { payload }: PayloadAction<string>) => {
      state.skills = state.skills.includes(payload)
        ? state.skills.filter(skill => skill !== payload)
        : [...state.skills, payload]
    },
    setSearchTerm: (state, { payload }: PayloadAction<string>) => {
      state.searchTerm = payload
    },
    resetAllFilters: () => initialSettings,
    addMultipleSkills: (state, { payload }: PayloadAction<string[]>) => {
      state.skills = [...new Set([...state.skills, ...payload])]
    },
    removeMultipleSkills: (state, { payload }: PayloadAction<string[]>) => {
      state.skills = state.skills.filter(skill => !payload.includes(skill))
    },
  },
})

export const {
  updateFilterType,
  updateGenderFilter,
  toggleCitySelection,
  toggleSkillSelection,
  setSearchTerm,
  resetAllFilters,
  addMultipleSkills,
  removeMultipleSkills,
} = filterSlice.actions

export default filterSlice.reducer
