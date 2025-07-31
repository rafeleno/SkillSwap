import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSkills } from '../../services/slices/filter/filterSlice'

type FiltersState = Record<string, string[]>

interface SkillItem {
  id: string
  name: string
  parent: string
  children: { id: string, name: string }[]
}

type FiltersMap = SkillItem[]

// interface CallbackProps {
//   type: 'skill' | 'gender' | 'location' | 'filterType'
//   id: string
// }

interface UseFiltersOptions {
  /**
   * Опциональный коллбэк, который будет вызван при любом изменении filters.
   * Можно использовать, чтобы "поднимать" состояние выше в родителя.
   */
  onChange?: (filters: FiltersState) => void
  /**
   * Начальное состояние фильтров (по умолчанию пустой объект).
   */
  initialFilters?: FiltersState
  skillsMap: FiltersMap
}

/**
 * Кастомный хук для управления выбором фильтров.
 */
export function useFilters({
  onChange,
  initialFilters = {},
  skillsMap,
}: UseFiltersOptions) {
  const [filters, setFilters] = useState<FiltersState>(initialFilters)

  /**
   * toggleFilter аналогичен вашему action в слайсе:
   *   payload = { type, id }
   * Если id уже есть в массиве filters[type] — удаляет, иначе — добавляет.
   */
  const toggleFilter = useCallback(
    (type: string, id: string) => {
      setFilters((prev) => {
        const prevArray = prev[type] || []
        const exists = prevArray.includes(id)

        function collectDescendants(nodeId: string, skills: FiltersMap): string[] {
          const node = skills[skills.findIndex(skill => skill.id === nodeId)]
          if (!node)
            return []
          return node.children.reduce(
            (all, child) => all.concat(child.id, collectDescendants(child.id, skills)),
            [],
          )
        }

        // создаём новый массив для данного типа
        // const newArray = exists
        //   ? prevArray.filter(item => item !== id)
        //   : [...prevArray, id]

        const newArray = (() => {
          if (exists) {
            if (type === 'skill') {
              return prevArray.filter(item => item !== id && !collectDescendants(id, skillsMap).includes(item))
            }
            return prevArray.filter(item => item !== id)
          }
          else {
            if (type === 'gender' || type === 'filterType') {
              return [id]
            }
            if (type === 'skill') {
              return [id, ...collectDescendants(id, skillsMap)]
            }

            return [...prevArray, id]
          }
        })()

        const newFilters = {
          ...prev,
          [type]: newArray,
        }

        // сообщаем наверх
        if (onChange) {
          onChange(newFilters)
        }

        return newFilters
      })
    },
    [onChange],
  )

  /** Полностью сбросить все фильтры */
  const clearAllFilters = useCallback(() => {
    setFilters({})
    if (onChange) {
      onChange({})
    }
  }, [onChange])

  return {
    filters,
    toggleFilter,
    clearAllFilters,
  }
}
