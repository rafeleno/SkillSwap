import React, { useCallback, useState } from 'react'

type FiltersState = Record<string, string[]>

interface SkillItem {
  id: string
  name: string
  parent: string | null
  children: { id: string, name: string }[]
}

type FiltersMap = Record<string, SkillItem>

interface UseFiltersOptions {
  /**
   * Опциональный коллбэк, который будет вызван при любом изменении filters.
   * Можно использовать, чтобы "поднимать" состояние выше в родителя.
   */
  onChange?: (filters: FiltersState) => void
  /**
   * Начальное состояние фильтров (по умолчанию пустой объект).
   */
  skillsMap: FiltersMap
  initialFilters?: FiltersState
}

interface CallbackProps {
  type: 'skill' | 'gender' | 'location' | 'filterType'
  id: string
}

/**
 * Хук для управления выбором фильтров.
 */
export function useFilters({
  onChange,
  skillsMap,
}: UseFiltersOptions) {
  const [filters, setFilters] = useState<FiltersState>({})

  const toggleFilter = useCallback(
    ({ type, id }: CallbackProps) => {
      setFilters((prev) => {
        const prevArray = prev[type] || []
        const exists = prevArray.includes(id)

        function collectDescendants(nodeId: string, skills: FiltersMap): string[] {
          const node = skills[nodeId]
          if (!node)
            return []
          return node.children.reduce(
            (all, child) => all.concat(child.id, collectDescendants(child.id, skills)),
            [],
          )
        }

        // создаём новый массив для данного типа
        const newArray = (() => {
          if (exists) {
            return prevArray.filter(item => item !== id)
          }

          if (type === 'skill') {
            return [...prevArray, id, ...collectDescendants(id, skillsMap)]
          }

          return [...prevArray, id]
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

  return {
    filters,
    toggleFilter,
  }
}
