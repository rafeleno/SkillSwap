import type { CheckboxParentInputProps } from './CheckboxParentInput.types'
import React, { useCallback } from 'react'
import styles from './styles.module.scss'

export const CheckboxParentInput = React.memo<CheckboxParentInputProps>(({ id, checked, name, onChange, filterKey, filterId, openState, setOpenState, children }) => {
  const handleToggleOpen = useCallback(() => {
    setOpenState((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }))
  }, [id, setOpenState])

  const handleChange = useCallback(() => {
    onChange(filterKey, filterId)
  }, [onChange, filterKey, filterId])

  return (
    <div className={`${styles['checkbox-container']} ${openState && styles['checkbox-open']}`}>
      <div className={styles['checkbox-content']}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={checked}
            name={name}
            onChange={handleChange}
            className={styles.input}
          />
          <svg className={styles['checkbox-icon']}>
            <use href={`#icon-${checked ? 'checkbox-remove' : 'checkbox-empty'}`} />
          </svg>
          <span className={styles.text}>{children}</span>
        </label>
      </div>
      <button onClick={handleToggleOpen} className={styles['arrow-button']}>
        <svg className={`${styles.arrow} ${!openState && styles['arrow-closed']}`}>
          <use href="#icon-arrow" />
        </svg>
      </button>
    </div>
  )
})
