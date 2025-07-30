import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFiltersList, selectSelectedFilters, toggleFilter } from '../../../services/slices/filter/filterSlice'
import styles from './styles.module.scss'

// TODO: вынести отсюда
interface CheckboxProps {
  checked: boolean
  name: string
  onChange: () => void
}
interface CheckboxParentProps {
  id: string
  checked: boolean
  name: string
  onChange: () => void
  openState: boolean
  setOpenState: (prev: any) => any
}

// TODO: вынести отсюда
const CheckboxParent: React.FC<CheckboxParentProps> = ({ id, checked, name, onChange, openState, setOpenState }) => {
  return (
    <div className={styles['checkbox-container']}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.input}
        />
        <svg className={styles['checkbox-icon']}>
          <use href={`#icon-${checked ? 'checkbox-remove' : 'checkbox-empty'}`} />
        </svg>
        <span className={styles.text}>{name}</span>
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
const Checkbox: React.FC<CheckboxProps> = ({ checked, name, onChange }) => {
  return (
    <div className={styles['checkbox-container']}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={styles.input}
        />
        <svg className={styles['checkbox-icon']}>
          <use href={`#icon-${checked ? 'checkbox-done' : 'checkbox-empty'}`} />
        </svg>
        <span className={styles.text}>{name}</span>
      </label>
    </div>
  )
}

export function FiltersPanel() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFiltersList)
  const selectedIds = useSelector(selectSelectedFilters)

  // TODO: Тут можно сделать отдельно для фильров родителей
  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    filters?.reduce((acc, filter) => {
      acc[filter.id] = false
      return acc
    }, {} as Record<string, boolean>),
  )

  return (
    <div>
      <ul>
        {filters.filter(item => item.parent === null).map(category => (
          <>
            <CheckboxParent
              id={category.id}
              checked={selectedIds.includes(category.id)}
              name={category.name}
              onChange={() => dispatch(toggleFilter(category.id))}
              openState={openStates[category.id]}
              setOpenState={setOpenStates}
            />

            {category.children.length > 0 && openStates[category.id] && (
              <ul className={styles.options}>
                {category.children.map(subCategory => (
                  <li key={subCategory.id} className={styles.option}>
                    <Checkbox
                      checked={selectedIds.includes(subCategory.id)}
                      name={subCategory.name}
                      onChange={() => dispatch(toggleFilter(subCategory.id))}
                    />
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>
    </div>
  )
}
