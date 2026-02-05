import type { RadioInputProps } from './RadioInput.types'
import React, { useCallback } from 'react'
import styles from './styles.module.scss'

export const RadioInput = React.memo<RadioInputProps>(({
  name,
  value,
  checked,
  children,
  onChange,
  filterKey,
  filterId,
}) => {
  const handleChange = useCallback(() => {
    onChange(filterKey, filterId)
  }, [onChange, filterKey, filterId])

  const id = `${name}-${value}`
  return (
    <label htmlFor={id} className={styles.label}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={styles.input}
      />
      <span className={styles.radioIcon} />
      <span className={styles.text}>{children}</span>
    </label>
  )
})

export default RadioInput
