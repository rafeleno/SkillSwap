import type { LikeButtonProps } from './LikeButton.types'
import React from 'react'
import styles from './styles.module.scss'

export const LikeButton: React.FC<LikeButtonProps> = ({ onClick, isActive = false }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.button}
      aria-label="Поставить лайк"
    >
      <svg className={styles.icon} aria-hidden="true">
        <use
          href={`/sprites.svg#${isActive ? 'like-active' : 'like'}`}
          className={isActive ? styles.active : ''}
        />
      </svg>
    </button>
  )
}
