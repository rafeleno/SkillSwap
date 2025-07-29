import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectFiltersList, selectSelectedFilters, toggleFilter } from '../../../services/slices/filter/filterSlice'
import styles from './styles.module.scss'

export function FiltersPanel() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFiltersList)
  const selectedIds = useSelector(selectSelectedFilters)

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
            <div className={styles['checkbox-container']}>
              <label className={styles.label}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(category.id)}
                  onChange={() => dispatch(toggleFilter(category.id))}
                  className={styles.input}
                />
                <svg className={styles['checkbox-icon']}>
                  <use href={`#icon-${selectedIds.includes(category.id) ? 'checkbox-remove' : 'checkbox-empty'}`} />
                </svg>
                <span className={styles.text}>{category.name}</span>
              </label>
              <button onClick={() => setOpenStates(prev => ({ ...prev, [category.id]: !prev[category.id] }))} className={styles['arrow-button']}>
                <svg className={`${styles.arrow} ${!openStates[category.id] && styles['arrow-closed']}`}>
                  <use href="#icon-arrow" />
                </svg>
              </button>
            </div>

            {category.children.length > 0 && openStates[category.id] && (
              <ul className={styles.options}>
                {category.children.map(subCategory => (
                  <li key={subCategory.id} className={styles.option}>
                    <label className={styles.label}>
                      <div className={styles['checkbox-container']}>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(subCategory.id)}
                          onChange={() => dispatch(toggleFilter(subCategory.id))}
                          className={styles.input}
                        />
                        <svg className={styles['checkbox-icon']}>
                          <use href={`#icon-${selectedIds.includes(subCategory.id) ? 'checkbox-done' : 'checkbox-empty'}`} />
                        </svg>
                        <span className={styles.text}>{subCategory.name}</span>
                      </div>
                    </label>
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
