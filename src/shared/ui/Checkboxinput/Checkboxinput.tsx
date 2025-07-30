import { RadioInput } from '@uiComponents/RadioInput'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFiltersList, selectGenders, selectLocations, selectSelectedFilters, toggleFilter } from '../../../services/slices/filter/filterSlice'
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

export function FiltersPanel() {
  const dispatch = useDispatch()
  const skills = useSelector(selectFiltersList)
  const locations = useSelector(selectLocations)
  const genders = useSelector(selectGenders)
  const selectedSkillsIds = useSelector(selectSelectedFilters)

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
        {/* фильтры */}
      </ul>

      <h3 className={styles['sub-title']}>Навыки</h3>
      <ul className={styles['filter-checkbox-tab']}>
        {skills.filter(item => item.parent === null).map(category => (
          <>
            <CheckboxParent
              id={category.id}
              checked={category.checked}
              name={category.name}
              onChange={() => dispatch(toggleFilter({ id: category.id, type: 'skill' }))}
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
                      checked={selectedSkillsIds.includes(subCategory.id)} // Костыль
                      name={subCategory.name}
                      onChange={() => dispatch(toggleFilter({ id: subCategory.id, type: 'skill' }))}
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
              checked={gender.checked}
              name={gender.name}
              onChange={() => dispatch(toggleFilter({ id: gender.id, type: 'gender' }))}
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
              checked={location.checked}
              name={location.name}
              onChange={() => dispatch(toggleFilter({ id: location.id, type: 'location' }))}
            >
              {location.name}
            </Checkbox>
          </li>
        ))}
      </ul>

    </div>
  )
}
