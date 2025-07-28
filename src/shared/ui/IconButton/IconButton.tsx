import type { IconbuttonProps } from './IconButton.types'
import React from 'react'
import styles from './styles.module.scss'

export const IconButton: React.FC<IconbuttonProps> = ({ name, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg className={styles.svg} width="24px" height="24px">
        <use href={`#icon-${name}`} />
      </svg>
    </button>
  )
}
