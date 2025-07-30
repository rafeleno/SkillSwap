import type { DropdownProps } from './Dropdown.types'
import React, { useMemo, useRef, useState } from 'react'
import styles from './styles.module.scss'
import { useClickOutside } from './useClickOutside'

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onChange,
  label,
  height = 48,
  width = 208,
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

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${bordered ? styles.bordered : ''}`}
      style={{ width: `${width}px` }}
      tabIndex={-1}
    >
      <div
        className={`${styles.button} ${selectedOption ? styles.selected : ''}`}
        style={{ height: `${height}px` }}
        onClick={() => setIsOpen(prev => !prev)}
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
        <svg className={styles.icon} aria-hidden="true">
          <use href={`/sprites.svg#${isOpen ? 'chevron-up' : 'chevron-down'}`} />
        </svg>
      </div>

      {isOpen && (
        <ul className={styles['dropdown-list']}>
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
