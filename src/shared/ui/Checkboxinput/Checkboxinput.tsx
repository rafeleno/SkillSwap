import type { CheckboxInputProps } from './Checkboxinput.types'
import React from 'react'
import styles from './styles.module.scss'

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ checked, name, onChange, children }) => {
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
