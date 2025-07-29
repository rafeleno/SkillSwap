import type { RootState } from 'services/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'

type FilterType = 'Могу научить' | 'Хочу научиться' | 'Всё'
type Gender = 'male' | 'female' | 'Не указан'

interface FilterItem {
  id: string
  name: string
  parent: string | null
  children: { id: string, name: string }[]
}

type FiltersMap = Record<string, FilterItem>

interface FilterSettings {
  filterType: FilterType
  gender: Gender
  cities: any
  skills: FiltersMap
  selectedIds: any
}

// TODO: надо получать при инициализации из базы данных
const skillsData: FiltersMap = {
  art: { id: 'art', name: 'Искусство', parent: null, children: [{ id: 'drawing', name: 'Искусство' }, { id: 'music', name: 'Музыка' }] },
  sports: { id: 'sports', name: 'Спорт', parent: null, children: [{ id: 'football', name: 'Футбол' }, { id: 'tennis', name: 'Теннис' }] },
  drawing: { id: 'drawing', name: 'Рисование', parent: 'art', children: [] },
  music: { id: 'music', name: 'Музыка', parent: 'art', children: [] },
  football: { id: 'football', name: 'Футбол', parent: 'sports', children: [] },
  tennis: { id: 'tennis', name: 'Теннис', parent: 'sports', children: [] },
}

const initialSettings: FilterSettings = {
  filterType: 'Всё',
  gender: 'Не указан',
  cities: [],
  skills: skillsData,
  selectedIds: [],
}

export const filterSlice = createSlice({
  name: 'filterSettings',
  initialState: initialSettings,
  reducers: {
    toggleFilter(state, action) {
      const id = action.payload
      const isNowSelected = !state.selectedIds.includes(id)

      // рекурсивно собираем всех потомков
      function collectDescendants(nodeId: string): string[] {
        const node = state.skills[nodeId]
        if (!node)
          return []

        return node.children.reduce(
          (all, child) => all.concat(child.id, collectDescendants(child.id)),
          [],
        )
      }

      const allAffected = [id, ...collectDescendants(id)]

      if (isNowSelected) {
        // добавить всех
        state.selectedIds = Array.from(new Set([
          ...state.selectedIds,
          ...allAffected,
        ]))
      }
      else {
        // убрать всех
        state.selectedIds = state.selectedIds.filter(
          selId => !allAffected.includes(selId),
        )
      }
    },
    ///////////////////////////////////////////
    // updateFilterType: (state, { payload }: PayloadAction<FilterType>) => {
    //   state.filterType = payload
    // },
    // updateGenderFilter: (state, { payload }: PayloadAction<Gender>) => {
    //   state.gender = payload
    // },
    // toggleCitySelection: (state, { payload }: PayloadAction<string>) => {
    //   state.cities = state.cities.includes(payload)
    //     ? state.cities.filter(city => city !== payload)
    //     : [...state.cities, payload]
    // },
    // toggleSkillSelection: (state, { payload }: PayloadAction<string>) => {
    //   state.skills = state.skills.includes(payload)
    //     ? state.skills.filter(skill => skill !== payload)
    //     : [...state.skills, payload]
    // },
    // setSearchTerm: (state, { payload }: PayloadAction<string>) => {
    //   state.searchTerm = payload
    // },
    // resetAllFilters: () => initialSettings,
    // addMultipleSkills: (state, { payload }: PayloadAction<string[]>) => {
    //   state.skills = [...new Set([...state.skills, ...payload])]
    // },
    // removeMultipleSkills: (state, { payload }: PayloadAction<string[]>) => {
    //   state.skills = state.skills.filter(skill => !payload.includes(skill))
    // },
  },
})

export const selectFiltersList = createSelector(
  (state: RootState) => state.filterSettings.skills,
  (state: RootState) => state.filterSettings.selectedIds,
  (skills, selectedIds) =>
    Object.values(skills).map(f => ({
      ...f,
      checked: selectedIds.includes(f.id),
    })),
)

export const selectSelectedFilters = createSelector(
  (state: RootState) => state.filterSettings.selectedIds,
  selectedIds => selectedIds,
)

export const {
  // updateFilterType,
  // updateGenderFilter,
  // toggleCitySelection,
  // toggleSkillSelection,
  // setSearchTerm,
  // resetAllFilters,
  // addMultipleSkills,
  // removeMultipleSkills,
  toggleFilter,
} = filterSlice.actions

export default filterSlice.reducer // странное поведение при иморпте
