import type { LikeButtonProps } from './LikeButton.types'
import React from 'react'
import styles from './styles.module.scss'

export const LikeButton: React.FC<LikeButtonProps> = ({
  onClick,
  isActive = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.button} ${className}`}
      aria-label="Поставить лайк"
    >
      <svg className={`${styles.icon} ${isActive ? styles.active : ''}`} aria-hidden="true">
        <use href="/sprites.svg#like" />
      </svg>
    </button>
  )
}
