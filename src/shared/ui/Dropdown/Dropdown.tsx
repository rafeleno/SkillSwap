import type { DropdownProps, IOption } from './Dropdown.types'
import { CheckboxInput } from '../Checkboxinput/Checkboxinput'
import React, { useMemo, useRef, useState } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import styles from './styles.module.scss'

export const Dropdown: React.FC<DropdownProps> = ({
  options, // список опций для отображения
  selectedOption, // текущий выбранный элемент или массив выбранных (если isCheckbox)
  onChange, // callback при изменении выбора
  label, // метка по умолчанию / placeholder
  height = 48, // высота дропдауна
  width = '100%', // ширина дропдауна
  bordered = true, // отображать ли рамку
  searchable, // включён ли режим поиска
  isCheckbox, // активен ли режим множественного выбора
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Отфильтрованные опции по введённому поисковому запросу
  const filteredOptions = useMemo(() => {
    const normalized = searchTerm.toLowerCase().trim()
    return options.filter(option =>
      option.value.toLowerCase().includes(normalized),
    )
  }, [options, searchTerm])

  // Закрытие дропдауна при клике вне его области
  useClickOutside(containerRef, () => setIsOpen(false))

  const containerWidth = typeof width === 'number' ? `${width}px` : width

  const handleCheckboxToggle = (option: IOption) => {
    let newSelection: IOption[] = []

    if (Array.isArray(selectedOption)) {
      const exists = selectedOption.find(o => o.id === option.id)
      newSelection = exists
        ? selectedOption.filter(o => o.id !== option.id)
        : [...selectedOption, option]
    }
    else {
      // если selectedOption был null или не массив
      newSelection = [option]
    }

    onChange(newSelection)
  }

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
            <>
              {
                isCheckbox && Array.isArray(selectedOption)
                  ? (
                    <span className={styles['selected-value']}>
                      {selectedOption.length > 0
                        ? selectedOption.map(o => o.value).join(', ')
                        : label}
                    </span>
                  )
                  : (
                    (selectedOption && 'value' in selectedOption)
                      ? selectedOption.value
                      : label
                  )
              }

            </>
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
                <use href="/#icon-cross" />
              </svg>
            </button>
          )
          : (
            <svg className={styles.icon} aria-hidden="true">
              <use href={`/#icon-${isOpen ? 'chevron-up' : 'chevron-down'}`} />
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
                    if (!isCheckbox) {
                      onChange(option)
                      setIsOpen(false)
                      setSearchTerm(option.value)
                    }
                  }}
                  className={styles.option}
                >
                  {isCheckbox
                    ? (
                      <CheckboxInput
                        name={`checkbox-${option.id}`}
                        checked={Array.isArray(selectedOption) && selectedOption.some(o => o.id === option.id)}
                        onChange={() => handleCheckboxToggle(option)}
                      >
                        {option.value}
                      </CheckboxInput>

                    )
                    : (
                      option.value
                    )}
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