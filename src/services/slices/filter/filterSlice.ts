import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
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
  locations: CitiesMap | null
  skills: FiltersMap
}

/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////
// TODO: надо получать при инициализации из базы данных(не все)
// const skillsData: FiltersMap = {

//   bussiness: {
//     id: 'bussiness',
//     name: 'Бизнес',
//     parent: null,
//     children: [
//       { id: 'team_management', name: 'Управление командой' },
//       { id: 'marketing', name: 'Маркетинг и реклама' },
//       { id: 'sales', name: 'Продажи и переговоры' },
//       { id: 'personal_branding', name: 'Личный бренд' },
//       { id: 'resume_interview', name: 'Резюме и собеседование' },
//       { id: 'time_management', name: 'Тайм-менеджмент' },
//       { id: 'project_management', name: 'Проектное управление' },
//       { id: 'entrepreneurship', name: 'Предпринимательство' },
//     ],
//   },
//   art: {
//     id: 'art',
//     name: 'Творчество и искусство',
//     parent: null,
//     children: [
//       { id: 'drawing', name: 'Рисование и иллюстрация' },
//       { id: 'photography', name: 'Фотография' },
//       { id: 'video_editing', name: 'Видеомонтаж' },
//       { id: 'music', name: 'Музыка и звук' },
//       { id: 'acting', name: 'Актёрское мастерство' },
//       { id: 'creative_writing', name: 'Креативное письмо' },
//       { id: 'art_therapy', name: 'Арт-терапия' },
//       { id: 'decor_and_diy', name: 'Декор и DIY' },
//     ],
//   },
//   languages: {
//     id: 'languages',
//     name: 'Иностранные языки',
//     parent: null,
//     children: [
//       { id: 'english', name: 'Английский' },
//       { id: 'french', name: 'Французский' },
//       { id: 'spanish', name: 'Испанский' },
//       { id: 'german', name: 'Немецкий' },
//       { id: 'chinese', name: 'Китайский' },
//       { id: 'japanese', name: 'Японский' },
//       { id: '', name: 'Подготовка к экзаменам (IELTS, TOEFL)' },
//     ],
//   },
//   health: {
//     id: 'health',
//     name: 'Здоровье и лайфстайл',
//     parent: null,
//     children: [
//       { id: 'yoga', name: 'Йога и медитация' },
//       { id: 'nutrition', name: 'Питание и ЗОЖ' },
//       { id: 'mental_health', name: 'Ментальное здоровье' },
//       { id: 'mindfulness', name: 'Осознанность' },
//       { id: 'physical_training', name: 'Физические тренировки' },
//       { id: 'sleep_recovery', name: 'Сон и восстановление' },
//       { id: 'work_life_balance', name: 'Баланс жизни и работы' },
//     ],
//   },
//   home: {
//     id: 'home',
//     name: 'Дом и уют',
//     parent: null,
//     children: [
//       { id: 'cleaning', name: 'Уборка и организация' },
//       { id: 'pets', name: 'Домашние финансы' },
//       { id: 'cooking', name: 'Приготовление еды' },
//       { id: 'plants', name: 'Домашние растения' },
//       { id: 'repair', name: 'Ремонт' },
//       { id: 'storage', name: 'Хранение вещей' },
//     ],
//   },
//   education: {
//     id: 'education',
//     name: 'Образование и развитие',
//     parent: null,
//     children: [
//       { id: 'personal_development', name: 'Личностное развитие' },
//       { id: 'learning_skills', name: 'Навыки обучения' },
//       { id: 'cognitive_techniques', name: 'Когнитивные техники' },
//       { id: 'speed_reading', name: 'Скорочтение' },
//       { id: 'teaching_skills', name: 'Навыки преподавания' },
//       { id: 'coaching', name: 'Коучинг' },
//     ],
//   },

//   team_management: {
//     id: 'team_management',
//     name: 'Управление командой',
//     parent: 'business',
//     children: null,
//   },
//   marketing: {
//     id: 'marketing',
//     name: 'Маркетинг и реклама',
//     parent: 'business',
//     children: null,
//   },
//   sales: {
//     id: 'sales',
//     name: 'Продажи и переговоры',
//     parent: 'business',
//     children: null,
//   },
//   personal_branding: {
//     id: 'personal_branding',
//     name: 'Личный бренд',
//     parent: 'business',
//     children: null,
//   },
//   resume_interview: {
//     id: 'resume_interview',
//     name: 'Резюме и собеседование',
//     parent: 'business',
//     children: null,
//   },
//   time_management: {
//     id: 'time_management',
//     name: 'Тайм-менеджмент',
//     parent: 'business',
//     children: null,
//   },
//   project_management: {
//     id: 'project_management',
//     name: 'Проектное управление',
//     parent: 'business',
//     children: null,
//   },
//   entrepreneurship: {
//     id: 'entrepreneurship',
//     name: 'Предпринимательство',
//     parent: 'business',
//     children: null,
//   },

//   drawing: {
//     id: 'drawing',
//     name: 'Рисование и иллюстрация',
//     parent: 'art',
//     children: null,
//   },
//   photography: {
//     id: 'photography',
//     name: 'Фотография',
//     parent: 'art',
//     children: null,
//   },
//   video_editing: {
//     id: 'video_editing',
//     name: 'Видеомонтаж',
//     parent: 'art',
//     children: null,
//   },
//   music_and_sound: {
//     id: 'music_and_sound',
//     name: 'Музыка и звук',
//     parent: 'art',
//     children: null,
//   },
//   acting: {
//     id: 'acting',
//     name: 'Актёрское мастерство',
//     parent: 'art',
//     children: null,
//   },
//   creative_writing: {
//     id: 'creative_writing',
//     name: 'Креативное письмо',
//     parent: 'art',
//     children: null,
//   },
//   art_therapy: {
//     id: 'art_therapy',
//     name: 'Арт-терапия',
//     parent: 'art',
//     children: null,
//   },
//   diy: {
//     id: 'diy',
//     name: 'Декор и DIY',
//     parent: 'art',
//     children: null,
//   },

//   english: {
//     id: 'english',
//     name: 'Английский',
//     parent: 'languages',
//     children: null,
//   },
//   french: {
//     id: 'french',
//     name: 'Французский',
//     parent: 'languages',
//     children: null,
//   },
//   spanish: {
//     id: 'spanish',
//     name: 'Испанский',
//     parent: 'languages',
//     children: null,
//   },
//   german: {
//     id: 'german',
//     name: 'Немецкий',
//     parent: 'languages',
//     children: null,
//   },
//   chinese: {
//     id: 'chinese',
//     name: 'Китайский',
//     parent: 'languages',
//     children: null,
//   },
//   japanese: {
//     id: 'japanese',
//     name: 'Японский',
//     parent: 'languages',
//     children: null,
//   },
//   exam_preparation: {
//     id: 'exam_preparation',
//     name: 'Подготовка к экзаменам (IELTS, TOEFL)',
//     parent: 'languages',
//     children: null,
//   },

//   yoga_and_meditation: {
//     id: 'yoga_and_meditation',
//     name: 'Йога и медитация',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },
//   nutrition_and_health: {
//     id: 'nutrition_and_health',
//     name: 'Питание и ЗОЖ',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },
//   mental_health: {
//     id: 'mental_health',
//     name: 'Ментальное здоровье',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },
//   mindfulness: {
//     id: 'mindfulness',
//     name: 'Осознанность',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },
//   physical_training: {
//     id: 'physical_training',
//     name: 'Физические тренировки',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },
//   sleep_and_recovery: {
//     id: 'sleep_and_recovery',
//     name: 'Сон и восстановление',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },
//   work_life_balance: {
//     id: 'work_life_balance',
//     name: 'Баланс жизни и работы',
//     parent: 'health_and_lifestyle',
//     children: null,
//   },

//   cleaning_and_organization: {
//     id: 'cleaning_and_organization',
//     name: 'Уборка и организация',
//     parent: 'home_and_comfort',
//     children: null,
//   },
//   home_finances: {
//     id: 'home_finances',
//     name: 'Домашние финансы',
//     parent: 'home_and_comfort',
//     children: null,
//   },
//   cooking: {
//     id: 'cooking',
//     name: 'Приготовление еды',
//     parent: 'home_and_comfort',
//     children: null,
//   },
//   houseplants: {
//     id: 'houseplants',
//     name: 'Домашние растения',
//     parent: 'home_and_comfort',
//     children: null,
//   },
//   repair: {
//     id: 'repair',
//     name: 'Ремонт',
//     parent: 'home_and_comfort',
//     children: null,
//   },
//   storage: {
//     id: 'storage',
//     name: 'Хранение вещей',
//     parent: 'home_and_comfort',
//     children: null,
//   },

//   personal_development: {
//     id: 'personal_development',
//     name: 'Личностное развитие',
//     parent: 'education_and_development',
//     children: null,
//   },
//   learning_skills: {
//     id: 'learning_skills',
//     name: 'Навыки обучения',
//     parent: 'education_and_development',
//     children: null,
//   },
//   cognitive_techniques: {
//     id: 'cognitive_techniques',
//     name: 'Когнитивные техники',
//     parent: 'education_and_development',
//     children: null,
//   },
//   speed_reading: {
//     id: 'speed_reading',
//     name: 'Скорочтение',
//     parent: 'education_and_development',
//     children: null,
//   },
//   teaching_skills: {
//     id: 'teaching_skills',
//     name: 'Навыки преподавания',
//     parent: 'education_and_development',
//     children: null,
//   },
//   coaching: {
//     id: 'coaching',
//     name: 'Коучинг',
//     parent: 'education_and_development',
//     children: null,
//   },
// }
// const LocationsData: CitiesMap = {
//   moscow: { name: 'Москва', id: 'msk' },
//   saintPetersburg: { name: 'Санкт-Петербург', id: 'spb' },
//   novosibirsk: { name: 'Новосибирск', id: 'nvsbrk' },
//   newYork: { name: 'Нью-Йорк', id: 'ny' },
//   losAngeles: { name: 'Лос-Анджелес', id: 'la' },
//   brooklyn: { name: 'Бруклин', id: 'bk' },
// }
const gendersData: GendersMap = { male: { name: 'Мужской', id: 'male' }, female: { name: 'Женский', id: 'female' }, notSpecified: { name: 'Не имеет значения', id: 'notSpecified' } }
const filterData: FilterTypesMap = { wantToTeach: { name: 'Могу научить', id: 'wantToTeach' }, wantToLearn: { name: 'Хочу научиться', id: 'wantToLearn' }, all: { name: 'Всё', id: 'all' } }
/// //////////////////////////////////////////////---МОКИ---//////////////////////////////////////////////////////////////

const initialSettings: FilterSettings = {
  filterTypes: filterData,
  genders: gendersData,
  locations: null,
  skills: skillsData,

}
export const filterSlice = createSlice({
  name: 'filterSettings',
  initialState: initialSettings,
  reducers: {
    initFilterSettings(state, action: { payload: TUser[] }) {
      state.locations = action.payload.reduce((acc, user) => {
        acc[user.location] = { id: user.location, name: user.location }
        return acc
      }, {} as CitiesMap)
    },
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
