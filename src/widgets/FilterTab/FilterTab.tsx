import type { FilterTabProps } from './FilterTab.types'
import { CheckboxInput } from '@uiComponents/CheckboxInput/Checkboxinput'
import { CheckboxParentInput } from '@uiComponents/CheckboxParentInput'
import { MainButton } from '@uiComponents/MainButton'
import { RadioInput } from '@uiComponents/RadioInput'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFilterTypes, selectGenders, selectLocations } from '../../services/slices/filter/filterSlice'
import { selectAllCategories } from '../../services/slices/skill/skillSlice'
import { useFilters } from '../../shared/hooks/useFilters'
import styles from './styles.module.scss'

// TODO: Можо меморизировать чекбоксы и радиокнопки, при выборе одной все ререндорятся

export const FilterTab: React.FC<FilterTabProps> = ({ onFiltersChange }) => {
  const skills = useSelector(selectAllCategories)
  const locations = useSelector(selectLocations)
  const filterTypes = useSelector(selectFilterTypes)
  const genders = useSelector(selectGenders)

  const {
    filters,
    toggleFilter,
    clearAllFilters,
  } = useFilters({ onChange: onFiltersChange, skillsMap: skills })

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    skills?.reduce((acc, filter) => {
      acc[filter.id] = false
      return acc
    }, {} as Record<string, boolean>),
  )
  // useMemo - Излишество
  const filtersCount = useMemo(() => {
    return Object.keys(filters).reduce((acc, key) => {
      return acc + filters[key].length
    }, 0)
  }, [filters])

  return (
    <div className={styles.filters}>
      <div className={styles['filters-header']}>
        <h2 className={styles.title}>
          Фильтры
          {!!filtersCount && <span>{`(${filtersCount})`}</span>}
        </h2>
        {!!filtersCount && (
          <MainButton
            onClick={() => {
              clearAllFilters()
            }}
            type="compact"
            rightIconId="cross"
          >
            Сбросить
          </MainButton>
        )}
      </div>
      <ul className={styles['filter-radio-tab']}>
        {filterTypes.map(filterType => (
          <li key={filterType.id} className={styles.option}>
            <RadioInput
              checked={filters.filterType?.includes(filterType.id) ?? false}
              name={filterType.name}
              onChange={() => toggleFilter('filterType', filterType.id)}
            >
              {filterType.name}
            </RadioInput>
          </li>
        ))}
      </ul>
      <h3 className={styles['sub-title']}>Навыки</h3>
      <div className={styles['filters-tab__container']}>
        <ul className={`${styles['filters-tab']} ${styles['filters-tab__bottom-fade']}`}>
          {skills.filter(item => item.parent === null).map(category => (
          // TODO: Доделать скролл(стили)
            <li key={category.id} className={styles.option}>
              <CheckboxParentInput
                id={category.id}
                checked={filters.skill?.includes(category.id) ?? false}
                name={category.name}
                onChange={() => toggleFilter('skill', category.id)}
                openState={openStates[category.id]}
                setOpenState={setOpenStates}
              >
                {category.name}
              </CheckboxParentInput>

              {category.children.length > 0 && openStates[category.id] && (
                <ul className={styles.options}>
                  {category.children.map(subCategory => (
                    <li key={subCategory.id} className={styles.option}>
                      <CheckboxInput
                        checked={filters.skill?.includes(subCategory.id) ?? false} // Костыль
                        name={subCategory.name}
                        onChange={() => toggleFilter('skill', subCategory.id)}
                      >
                        {subCategory.name}
                      </CheckboxInput>
                    </li>
                  ))}
                </ul>
              )}
            </li>

          ))}
        </ul>
      </div>

      <h3 className={styles['sub-title']}>Пол автора</h3>
      <ul className={styles['filters-tab']}>
        {genders.map(gender => (
          <li key={gender.id} className={styles.option}>
            <RadioInput
              checked={filters.gender?.includes(gender.id) ?? false}
              name={gender.name}
              onChange={() => toggleFilter('gender', gender.id)}
            >
              {gender.name}
            </RadioInput>
          </li>
        ))}
      </ul>

      <h3 className={styles['sub-title']}>Город</h3>
      <div className={styles['filters-tab__container']}>
        <ul className={`${styles['filters-tab']} ${styles['filters-tab__bottom-fade']}`}>
          {locations.map(location => (
            <li key={location.id} className={styles.option}>
              <CheckboxInput
                checked={filters.locations?.includes(location.id) ?? false}
                name={location.name}
                onChange={() => toggleFilter('locations', location.id)}
              >
                {location.name}
              </CheckboxInput>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
