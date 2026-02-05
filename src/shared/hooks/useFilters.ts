import type React from 'react'
import { initialFilters } from '@pageComponents/MainPage/MainPage'
import { useCallback } from 'react'

// TODO: Вынести в общие типы
export type FiltersState = Record<string, string[]>

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
   * Чтобы "поднимать" состояние выше в родителя.
   */
  onChange?: (filters: FiltersState) => void
  /**
   * Начальное состояние фильтров (по умолчанию пустой объект).
   */
  initialFilters?: FiltersState
  skillsMap: FiltersMap
  filters: FiltersState
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}

/**
 * Кастомный хук для управления выбором фильтров.
 */
export function useFilters({
  onChange,
  skillsMap,
  filters,
  setFilters,
}: UseFiltersOptions) {
  // const [filters, setFilters] = useState<FiltersState>(initialFilters)

  // useEffect(() => {
  //   if (onChange) {
  //     onChange(filters)
  //   }
  // }, [filters])

  const toggleFilter = useCallback(
    (type: string, id: string) => {
      setFilters((prev) => {
        const prevArray = prev[type] || []
        const exists = prevArray.includes(id)

        // Логика для сбора дочерних элементов
        const collectDescendants = (nodeId: string, skills: FiltersMap): string[] => {
          const node = skills.find(skill => skill.id === nodeId)
          if (!node)
            return []
          return node.children?.reduce(
            (all, child) => all.concat(child.id, collectDescendants(child.id, skills)),
            [],
          ) || []
        }

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
              const newArray = [...prevArray, id, ...collectDescendants(id, skillsMap)]
              return Array.from(new Set(newArray))
            }
            return [...prevArray, id]
          }
        })()

        const newFilters = {
          ...prev,
          [type]: newArray,
        }

        // Вызов onChange, если он определен
        if (onChange) {
          onChange(newFilters)
        }

        return newFilters
      })
    },
    [onChange, skillsMap, setFilters],
  )

  const clearAllFilters = useCallback(() => {
    setFilters(initialFilters)
    // if (onChange) {
    //   onChange(initialFilters)
    // }
  }, [onChange])

  return {
    filters,
    toggleFilter,
    clearAllFilters,
  }
}
