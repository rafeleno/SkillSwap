import type { MainButtonProps } from './MainButton.types'
import React from 'react'
import styles from './styles.module.scss'

export const MainButton: React.FC<MainButtonProps> = ({
  type,
  children,
  disabled,
  onClick,
  leftIconId,
  rightIconId,
  isActive,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${isActive ? styles.active : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIconId && (
        <svg className={styles.icon}>
          <use href={`#icon-${leftIconId}`} />
        </svg>
      )}
      {children}
      {rightIconId && (
        <svg className={styles.icon}>
          <use href={`#icon-${rightIconId}`} />
        </svg>
      )}
    </button>
  )
}
