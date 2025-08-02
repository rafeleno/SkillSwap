import type { DropdownProps } from './Dropdown.types'
import React, { useMemo, useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './styles.module.scss'

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onChange,
  label,
  height = 48,
  width = '100%',
  bordered = true,
  searchable,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(() => {
    const normalized = searchTerm.toLowerCase().trim()
    return options.filter(option =>
      option.value.toLowerCase().includes(normalized),
    )
  }, [options, searchTerm])

  useClickOutside(containerRef, () => setIsOpen(false))

  const containerWidth = typeof width === 'number' ? `${width}px` : width

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${bordered ? styles.bordered : ''}`}
      style={{ width: containerWidth }}
      tabIndex={-1}
    >
      <div
        className={`${styles.button} ${selectedOption ? styles.selected : ''}`}
        style={{ height: `${height}px` }}
        onClick={() => {
          setIsOpen((prev) => {
            const newIsOpen = !prev
            if (newIsOpen) {
              setSearchTerm('')
            }
            return newIsOpen
          })
        }}
      >
        {searchable
          ? (
              <input
                type="text"
                className={styles.input}
                onChange={e => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder={label}
                onFocus={() => setIsOpen(true)}
                onClick={e => e.stopPropagation()}
              />
            )
          : (
              selectedOption ? selectedOption.value : label
            )}

        {searchable && searchTerm
          ? (
              <button
                type="button"
                className={styles['clear-button']}
                onClick={(e) => {
                  e.stopPropagation()
                  setSearchTerm('')
                  setIsOpen(true)
                }}
                aria-label="Clear input"
              >
                <svg className={styles.icon} aria-hidden="true">
                  <use href="/sprites.svg#cross" />
                </svg>
              </button>
            )
          : (
              <svg className={styles.icon} aria-hidden="true">
                <use href={`/sprites.svg#${isOpen ? 'chevron-up' : 'chevron-down'}`} />
              </svg>
            )}
      </div>

      {isOpen && (
        <ul className={`${styles['dropdown-list']} ${bordered ? styles.bordered : ''}`}>
          {filteredOptions.length > 0
            ? (
                filteredOptions.map(option => (
                  <li
                    key={option.id}
                    onClick={() => {
                      onChange(option)
                      setIsOpen(false)
                      setSearchTerm(option.value)
                    }}
                    className={styles.option}
                  >
                    {option.value}
                  </li>
                ))
              )
            : (
                <li className={styles.option}>Ничего не найдено</li>
              )}
        </ul>
      )}
    </div>
  )
}
