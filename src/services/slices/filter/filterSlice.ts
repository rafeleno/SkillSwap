import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'services/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'

type FilterTypesMap = Record<string, FilterTypeItem>
type GendersMap = Record<string, MaleItem>
type FiltersMap = Record<string, SkillItem>
type CitiesMap = Record<string, CityItem>

interface CityItem {
  id: string
  name: string
}
interface SkillItem {
  id: string
  name: string
  parent: string | null
  children: { id: string, name: string }[]
}
interface MaleItem {
  id: string
  name: string
}
interface FilterTypeItem {
  id: string
  name: string
}

interface FilterSettings {
  filterTypes: FilterTypesMap
  genders: GendersMap
  locations: CitiesMap
  skills: FiltersMap
  // selectedSkillIds: string[]
  // selectedLocationIds: string[]
  // selectedGenderId: string[]
  // selectedFilterTypeId: string[]
}

/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////
// TODO: надо получать при инициализации из базы данных
const skillsData: FiltersMap = {
  art: { id: 'art', name: 'Искусство', parent: null, children: [{ id: 'drawing', name: 'Искусство' }, { id: 'music', name: 'Музыка' }] },
  sports: { id: 'sports', name: 'Спорт', parent: null, children: [{ id: 'football', name: 'Футбол' }, { id: 'tennis', name: 'Теннис' }] },
  drawing: { id: 'drawing', name: 'Рисование', parent: 'art', children: [] },
  music: { id: 'music', name: 'Музыка', parent: 'art', children: [] },
  football: { id: 'football', name: 'Футбол', parent: 'sports', children: [] },
  tennis: { id: 'tennis', name: 'Теннис', parent: 'sports', children: [] },
}
const LocationsData: CitiesMap = {
  moscow: { name: 'Москва', id: 'msk' },
  saintPetersburg: { name: 'Санкт-Петербург', id: 'spb' },
  novosibirsk: { name: 'Новосибирск', id: 'nvsbrk' },
}
const gendersData: GendersMap = { male: { name: 'Мужской', id: 'male' }, female: { name: 'Женский', id: 'female' }, notSpecified: { name: 'Не имеет значения', id: 'notSpecified' } }
const filterData: FilterTypesMap = { wantToTeach: { name: 'Могу научить', id: 'wantToTeach' }, wantToLearn: { name: 'Хочу научиться', id: 'wantToLearn' }, all: { name: 'Всё', id: 'all' } }
/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////

const initialSettings: FilterSettings = {
  filterTypes: filterData,
  genders: gendersData,
  locations: LocationsData,
  skills: skillsData,
  // selectedSkillIds: [],
  // selectedLocationIds: [],
  // selectedGenderId: ['Не имеет значения'],
  // selectedFilterTypeId: ['Всё'],

}

// interface ToggleFilterPayload {
//   id: string
//   type: 'skill' | 'gender' | 'location' | 'filterType'
// }

export const filterSlice = createSlice({
  name: 'filterSettings',
  initialState: initialSettings,
  reducers: {
    // toggleFilter(state, action: PayloadAction<ToggleFilterPayload>) {
    //   const { id, type } = action.payload

    //   // Определяем, какие поля менять
    //   let selectedIdsRef: string[] | undefined

    //   if (type === 'skill') {
    //     selectedIdsRef = state.selectedSkillIds
    //   }
    //   else if (type === 'location') {
    //     selectedIdsRef = state.selectedLocationIds
    //   }
    //   else if (type === 'gender') {
    //     selectedIdsRef = state.selectedGenderId
    //   }
    //   else if (type === 'filterType') {
    //     selectedIdsRef = state.selectedFilterTypeId
    //   }
    //   else {
    //     console.warn('Неизвестный тип фильтра:', type)
    //     return
    //   }

    //   const isNowSelected = !selectedIdsRef.includes(id)

    //   // Только для навыков: рекурсивный сбор потомков
    //   const allAffected
    //     = type === 'skill'
    //       ? [id, ...collectDescendants(id, state.skills)]
    //       : [id]

    //   // Добавить в выбранные
    //   if (isNowSelected) {
    //     // Если это Radio(избегаем )
    //     if (type === 'filterType' || type === 'gender') {
    //       selectedIdsRef.length = 0
    //     }
    //     selectedIdsRef.push(...allAffected.filter(i => !selectedIdsRef.includes(i)))
    //   }
    //   else {
    //     // Удалить из выбранных
    //     const filtered = selectedIdsRef.filter(selId => !allAffected.includes(selId))
    //     if (type === 'gender')
    //       state.selectedGenderId = filtered
    //     if (type === 'skill')
    //       state.selectedSkillIds = filtered
    //     if (type === 'location')
    //       state.selectedLocationIds = filtered
    //     if (type === 'filterType')
    //       state.selectedFilterTypeId = filtered
    //   }

    //   function collectDescendants(nodeId: string, skills: FiltersMap): string[] {
    //     const node = skills[nodeId]
    //     if (!node)
    //       return []
    //     return node.children.reduce(
    //       (all, child) => all.concat(child.id, collectDescendants(child.id, skills)),
    //       [],
    //     )
    //   }
    // },
  },
})

export const selectSkills = createSelector(
  (state: RootState) => state.filterSettings.skills,
  skills =>
    Object.values(skills).map(f => ({
      ...f,
    })),
)

export const selectGenders = createSelector(
  (state: RootState) => state.filterSettings.genders,
  genders =>
    Object.values(genders).map(f => ({
      ...f,
    })),
)

export const selectLocations = createSelector(
  (state: RootState) => state.filterSettings.locations,
  locations =>
    Object.values(locations).map(f => ({
      ...f,
    })),
)

export const selectFilterTypes = createSelector(
  (state: RootState) => state.filterSettings.filterTypes,
  filterTypes =>
    Object.values(filterTypes).map(f => ({
      ...f,
    })),
)

// export const selectFiltersList = createSelector(
//   (state: RootState) => state.filterSettings.skills,
//   (state: RootState) => state.filterSettings.selectedSkillIds,
//   (skills, selectedSkillsIds) =>
//     Object.values(skills).map(f => ({
//       ...f,
//     })),
// )

// export const selectGenders = createSelector(
//   (state: RootState) => state.filterSettings.genders,
//   (state: RootState) => state.filterSettings.selectedGenderId,
//   (genders, selectedGenderId) =>
//     Object.values(genders).map(f => ({
//       ...f,
//       checked: selectedGenderId.includes(f.id),
//     })),
// )

// export const selectLocations = createSelector(
//   (state: RootState) => state.filterSettings.locations,
//   (state: RootState) => state.filterSettings.selectedLocationIds,
//   (locations, selectedLocationsIds) =>
//     Object.values(locations).map(f => ({
//       ...f,
//       checked: selectedLocationsIds.includes(f.id),
//     })),
// )

// export const selectFilterTypes = createSelector(
//   (state: RootState) => state.filterSettings.filterTypes,
//   (state: RootState) => state.filterSettings.selectedFilterTypeId,
//   (filterTypes, selectedFilterTypeId) =>
//     Object.values(filterTypes).map(f => ({
//       ...f,
//       checked: selectedFilterTypeId.includes(f.id),
//     })),
// )

// export const {
// updateFilterType,
// updateGenderFilter,
// toggleCitySelection,
// toggleSkillSelection,
// setSearchTerm,
// resetAllFilters,
// addMultipleSkills,
// removeMultipleSkills,
// toggleFilter,
// } = filterSlice.actions

export default filterSlice.reducer // странное поведение при иморпте
