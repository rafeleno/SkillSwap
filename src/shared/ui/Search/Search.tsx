import type { SearchProps } from './Search.types'
import React from 'react'
import styles from './styles.module.scss'

export const Search: React.FC<SearchProps> = ({
  user,
  value,
  placeholder = 'Искать навык',
  onChange,
  onClear,
}) => {
  return (
    <>
      <div className={user ? (styles.searchContainer_logged, styles.searchContainer) : styles.searchContainer}>
        <span className={styles.searchIcon}>
          <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="#icon-search" />
          </svg>
        </span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {value && (
          <button
            className={styles.searchClearButton}
            type="button"
            onClick={onClear}
            aria-label="Очистить поле ввода"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <use href="#icon-cross" />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}
