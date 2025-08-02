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
}

/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////
// TODO: надо получать при инициализации из базы данных(не все)
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
  newYork: { name: 'Нью-Йорк', id: 'ny' },
  losAngeles: { name: 'Лос-Анджелес', id: 'la' },
  brooklyn: { name: 'Бруклин', id: 'bk' },
  moscow2: { name: 'Москва', id: 'msk' },
  saintPetersburg2: { name: 'Санкт-Петербург', id: 'spb' },
  novosibirsk2: { name: 'Новосибирск', id: 'nvsbrk' },
  newYork2: { name: 'Нью-Йорк', id: 'ny' },
  losAngeles2: { name: 'Лос-Анджелес', id: 'la' },
  brooklyn2: { name: 'Бруклин', id: 'bk' },
  moscow3: { name: 'Москва', id: 'msk' },
  saintPetersburg3: { name: 'Санкт-Петербург', id: 'spb' },
  novosibirsk3: { name: 'Новосибирск', id: 'nvsbrk' },
  newYork3: { name: 'Нью-Йорк', id: 'ny' },
  losAngeles3: { name: 'Лос-Анджелес', id: 'la' },
  brooklyn3: { name: 'Бруклин', id: 'bk' },

}
const gendersData: GendersMap = { male: { name: 'Мужской', id: 'male' }, female: { name: 'Женский', id: 'female' }, notSpecified: { name: 'Не имеет значения', id: 'notSpecified' } }
const filterData: FilterTypesMap = { wantToTeach: { name: 'Могу научить', id: 'wantToTeach' }, wantToLearn: { name: 'Хочу научиться', id: 'wantToLearn' }, all: { name: 'Всё', id: 'all' } }
/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////

const initialSettings: FilterSettings = {
  filterTypes: filterData,
  genders: gendersData,
  locations: LocationsData,
  skills: skillsData,

}
export const filterSlice = createSlice({
  name: 'filterSettings',
  initialState: initialSettings,
  reducers: {
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

export default filterSlice.reducer // странное поведение при импорте
