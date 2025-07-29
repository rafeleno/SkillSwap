import type { CheckboxInputProps } from './CheckboxInput.types'
import React, { useState } from 'react'
import styles from './styles.module.scss'

export function CheckboxInput({
  children,
  options,
  active = false,
  opened = false,
  onChange,
  onOpen,
}: CheckboxInputProps) {
  const [states, setStates] = useState<Record<string, boolean>>(() =>
    options?.reduce((acc, option) => {
      acc[option] = false
      return acc
    }, {} as Record<string, boolean>),
  )

  return (
    <>
      <div className={styles['checkbox-container']}>
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={active}
            onChange={onChange}
            className={styles.input}
            disabled={!onChange}
          />
          <svg className={styles['checkbox-icon']}>
            <use href={`#icon-${active ? 'checkbox-remove' : 'checkbox-empty'}`} />
          </svg>
          <span className={styles.text}>{children}</span>
        </label>
        <button onClick={() => { onOpen(), console.log(opened) }} className={styles['arrow-button']}>
          <svg className={`${styles.arrow} ${!opened && styles['arrow-closed']}`}>
            <use href="#icon-arrow" />
          </svg>
        </button>
      </div>

      {options && opened && (
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
