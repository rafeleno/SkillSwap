import type { FiltersState } from 'shared/hooks/useFilters'
import { FilterTab } from '@widgetComponents/FilterTab'
import React, { useEffect } from 'react'

export function App() {
  // Удалить
  const [filters, setFilters] = React.useState<FiltersState>({
    skill: [],
    gender: [],
    location: [],
    filterType: [],
  })

  // Удалить
  useEffect(() => {
    console.log(filters)
  }, [filters])

  return (
    <FilterTab onFiltersChange={setFilters} />
  )
}
