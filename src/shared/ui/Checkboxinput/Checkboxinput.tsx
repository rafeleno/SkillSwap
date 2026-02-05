import type { CheckboxInputProps } from './Checkboxinput.types'
import React, { useCallback } from 'react'
import styles from './styles.module.scss'

export const CheckboxInput = React.memo<CheckboxInputProps>(({ checked, name, onChange, filterKey, filterId, children }) => {
  const handleChange = useCallback(() => {
    onChange(filterKey, filterId)
  }, [onChange, filterKey, filterId])

  return (
    <div className={styles['checkbox-container']}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          name={name}
          onChange={handleChange}
          className={styles.input}
        />
        <svg className={styles['checkbox-icon']}>
          <use href={`#icon-${checked ? 'checkbox-done' : 'checkbox-empty'}`} />
        </svg>
        <span className={styles.text}>{children}</span>
      </label>
    </div>
  )
})
