import type { CheckboxParentInputProps } from './CheckboxParentInput.types'
import React from 'react'
import styles from './styles.module.scss'

export const CheckboxParentInput: React.FC<CheckboxParentInputProps> = ({ id, checked, name, onChange, openState, setOpenState, children }) => {
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
