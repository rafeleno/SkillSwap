import { RadioInput } from '@uiComponents/RadioInput'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFiltersList, selectFilterTypes, selectGenders, selectLocations, selectSelectedFilters } from '../../../services/slices/filter/filterSlice'
import { useFilters } from '../../../shared/hooks/useFilters'
import styles from './styles.module.scss'

// TODO: вынести отсюда
interface CheckboxProps {
  checked: boolean
  name: string
  onChange: () => void
  children: React.ReactNode
}
interface CheckboxParentProps {
  id: string
  checked: boolean
  name: string
  onChange: () => void
  openState: boolean
  setOpenState: (prev: any) => any
  children: React.ReactNode
}

// TODO: вынести отсюда
const CheckboxParent: React.FC<CheckboxParentProps> = ({ id, checked, name, onChange, openState, setOpenState, children }) => {
  return (
    <div className={styles['checkbox-container']}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          name={name}
          onChange={onChange}
          className={styles.input}
        />
        <svg className={styles['checkbox-icon']}>
          <use href={`#icon-${checked ? 'checkbox-remove' : 'checkbox-empty'}`} />
        </svg>
        <span className={styles.text}>{children}</span>
      </label>
      <button onClick={() => setOpenState(prev => ({ ...prev, [id]: !prev[id] }))} className={styles['arrow-button']}>
        <svg className={`${styles.arrow} ${!openState[id] && styles['arrow-closed']}`}>
          <use href="#icon-arrow" />
        </svg>
      </button>
    </div>
  )
}

// TODO: вынести отсюда
const Checkbox: React.FC<CheckboxProps> = ({ checked, name, onChange, children }) => {
  return (
    <div className={styles['checkbox-container']}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          name={name}
          onChange={onChange}
          className={styles.input}
        />
        <svg className={styles['checkbox-icon']}>
          <use href={`#icon-${checked ? 'checkbox-done' : 'checkbox-empty'}`} />
        </svg>
        <span className={styles.text}>{children}</span>
      </label>
    </div>
  )
}

// /////////////////////////// Это внешенее состояние родителя
export function FiltersPanel({ onFiltersChange }) {
  const skills = useSelector(selectFiltersList)
  const locations = useSelector(selectLocations)
  const filterTypes = useSelector(selectFilterTypes)
  const genders = useSelector(selectGenders)
  // const selectedSkillsIds = useSelector(selectSelectedFilters)


  console.log(skills);
  
  const {
    filters,
    toggleFilter,
  } = useFilters({ onChange: onFiltersChange, skillsMap: skills })

  // TODO: Тут можно сделать отдельно для фильров родителей
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    skills?.reduce((acc, filter) => {
      acc[filter.id] = false
      return acc
    }, {} as Record<string, boolean>),
  )

  return (
    <div className={styles['filters-panel']}>

      <h2 className={styles.title}>Фильтры</h2>
      <ul className={styles['filter-radio-tab']}>
        {filterTypes.map(filterType => (
          <li key={filterType.id} className={styles.option}>
            <RadioInput
              checked={filters.filterType?.includes(filterType.id)}
              name={filterType.name}
              onChange={() => toggleFilter({ type: 'filterType', id: filterType.id })}
            >
              {filterType.name}
            </RadioInput>
          </li>
        ))}
      </ul>

      <h3 className={styles['sub-title']}>Навыки</h3>
      <ul className={styles['filter-checkbox-tab']}>
        {skills.filter(item => item.parent === null).map(category => (
          <>
            <CheckboxParent
              id={category.id}
              checked={filters.skill?.includes(category.id)}
              name={category.name}
              onChange={() => toggleFilter({ type: 'skill', id: category.id })}
              openState={openStates[category.id]}
              setOpenState={setOpenStates}
            >
              {category.name}
            </CheckboxParent>

            {category.children.length > 0 && openStates[category.id] && (
              <ul className={styles.options}>
                {category.children.map(subCategory => (
                  <li key={subCategory.id} className={styles.option}>
                    <Checkbox
                      checked={filters.skill?.includes(subCategory.id)} // Костыль
                      name={subCategory.name}
                      onChange={() => toggleFilter({ type: 'skill', id: subCategory.id })}
                    >
                      {subCategory.name}
                    </Checkbox>
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>

      <h3 className={styles['sub-title']}>Пол автора</h3>
      <ul className={styles['filter-radio-tab']}>
        {genders.map(gender => (
          <li key={gender.id} className={styles.option}>
            <RadioInput
              checked={filters.gender?.includes(gender.id)}
              name={gender.name}
              onChange={() => toggleFilter({ type: 'gender', id: gender.id })}
            >
              {gender.name}
            </RadioInput>
          </li>
        ))}
      </ul>

      <h3 className={styles['sub-title']}>Город</h3>
      <ul className={styles['filter-checkbox-tab']}>
        {locations.map(location => (
          <li key={location.id} className={styles.option}>
            <Checkbox
              checked={filters.location?.includes(location.id)}
              name={location.name}
              onChange={() => toggleFilter({ type: 'location', id: location.id })}
            >
              {location.name}
            </Checkbox>
          </li>
        ))}
      </ul>

    </div>
  )
}
