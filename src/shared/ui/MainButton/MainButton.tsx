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
}) => {
  return (
    <button
      className={`${styles.button} ${styles[type]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {leftIconId && (
        <svg className={styles.icon}>
          <use xlinkHref={leftIconId} />
        </svg>
      )}
      {children}
      {rightIconId && (
        <svg className={styles.icon}>
          <use xlinkHref={rightIconId} />
        </svg>
      )}
    </button>
  )
}
