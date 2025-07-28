import type { CheckboxInputProps } from './CheckboxInput.types'
import React, { useState } from 'react'
import styles from './styles.module.scss'

export function CheckboxInput({
  children,
  options,
  active = false,
  onChange,
}: CheckboxInputProps) {
  const [states, setStates] = useState<Record<string, boolean>>(() =>
    options?.reduce((acc, option) => {
      acc[option] = false
      return acc
    }, {} as Record<string, boolean>),
  )

  return (
    <>
      <label className={styles.label}>
        <div className={styles['checkbox-container']}>
          <input
            type="checkbox"
            checked={active}
            onChange={onChange}
            className={styles.input}
            disabled={!onChange}
          />
          <svg className={styles['checkbox-icon']}>
            <use href={`#icon-${active ? 'checkbox-done' : 'checkbox-empty'}`} />
          </svg>
          <div className={styles['text-container']}>
            <span className={styles.text}>{children}</span>
            <svg className={`${styles.arrow} ${!active && styles['arrow-closed']}`}>
              <use href="#icon-arrow" />
            </svg>
          </div>
        </div>
      </label>

      {options && active && (
        <ul className={styles.options}>
          {options.map(option => (
            <li key={option} className={styles.option}>
              <label className={styles.label}>
                <div className={styles['checkbox-container']}>
                  <input
                    type="checkbox"
                    checked={states[option]}
                    onChange={() => setStates(prev => ({ ...prev, [option]: !prev[option] }))}
                    className={styles.input}
                    disabled={!onChange}
                  />
                  <svg className={styles['checkbox-icon']}>
                    <use href={`#icon-${states[option] ? 'checkbox-done' : 'checkbox-empty'}`} />
                  </svg>
                  <span className={styles.text}>{option}</span>
                </div>
              </label>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
