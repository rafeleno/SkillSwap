import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import type { RootState } from 'services/store'
import { createSelector, createSlice } from '@reduxjs/toolkit'

type FilterTypesMap = Record<string, FilterTypeItem>
type GendersMap = Record<string, MaleItem>
type CitiesMap = Record<string, CityItem>

interface CityItem {
  id: string
  name: string
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
  locations: CitiesMap | []
}

const gendersData: GendersMap = { male: { name: 'Мужской', id: 'male' }, female: { name: 'Женский', id: 'female' }, notSpecified: { name: 'Не имеет значения', id: 'notSpecified' } }
const filterData: FilterTypesMap = { wantToTeach: { name: 'Могу научить', id: 'wantToTeach' }, wantToLearn: { name: 'Хочу научиться', id: 'wantToLearn' }, all: { name: 'Всё', id: 'all' } }
/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////

const initialSettings: FilterSettings = {
  filterTypes: filterData,
  genders: gendersData,
  locations: [],

}
export const filterSlice = createSlice({
  name: 'filterSettings',
  initialState: initialSettings,
  reducers: {
    // TODO: Это надо будет удалить
    initFilterSettings(state, action: { payload: TUser[] }) {
      state.locations = action.payload.reduce((acc, user) => {
        acc[user.location] = { id: user.location, name: user.location }
        return acc
      }, {} as CitiesMap)
    },
  },
  // Набросок версии под юзеров из слайса а не из базы данных
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUsers.fulfilled, (state, action) => {
  //       state.locations = action.payload.reduce((acc, user) => {
  //         acc[user.location] = { id: user.location, name: user.location }
  //         return acc
  //       }, {} as CitiesMap)
  //     })
  // },
})

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

export const {
  initFilterSettings,
} = filterSlice.actions

export default filterSlice.reducer // странное поведение при импорте
