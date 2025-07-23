import type { SearchProps } from './Search.types'
import React from 'react'
import styles from './styles.module.scss'

export const Search: React.FC<SearchProps> = ({
  value,
  placeholder = 'Искать навык',
  onChange,
  onClear,
}) => {
  return (
    <>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.53491 19.0698C4.27908 19.0698 0 14.7907 0 9.53491C0 4.27908 4.27908 0 9.53491 0C14.7907 0 19.0698 4.27908 19.0698 9.53491C19.0698 14.7907 14.7907 19.0698 9.53491 19.0698ZM9.53491 1.39535C5.04187 1.39535 1.39535 5.05118 1.39535 9.53491C1.39535 14.0186 5.04187 17.6745 9.53491 17.6745C14.0279 17.6745 17.6745 14.0186 17.6745 9.53491C17.6745 5.05118 14.0279 1.39535 9.53491 1.39535Z" fill="#69735D" />
            <path d="M19.3024 20C19.1257 20 18.9489 19.9348 18.8094 19.7953L16.9489 17.9348C16.6791 17.6651 16.6791 17.2186 16.9489 16.9488C17.2187 16.679 17.6652 16.679 17.935 16.9488L19.7954 18.8093C20.0652 19.079 20.0652 19.5255 19.7954 19.7953C19.6559 19.9348 19.4791 20 19.3024 20Z" fill="#69735D" />
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
            <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7438 1.28748L2.25847 9.77276C1.96856 10.0627 1.48772 10.0627 1.19781 9.77276C0.907897 9.48285 0.907897 9.00202 1.19781 8.7121L9.68309 0.226819C9.97301 -0.0630947 10.4538 -0.0630948 10.7438 0.226819C11.0337 0.516733 11.0337 0.997565 10.7438 1.28748Z" fill="#253017" />
              <path d="M10.7438 9.77281C10.4538 10.0627 9.97301 10.0627 9.68309 9.77281L1.19781 1.28753C0.907897 0.997618 0.907897 0.516786 1.19781 0.226872C1.48772 -0.0630417 1.96856 -0.0630417 2.25847 0.226872L10.7438 8.71215C11.0337 9.00207 11.0337 9.4829 10.7438 9.77281Z" fill="#253017" />
            </svg>
          </button>
        )}
      </div>
    </>
  )
}
