import type { FiltersState } from 'shared/hooks/useFilters'
import { FilterTab } from '@widgetComponents/FilterTab'
import React from 'react'

export const MainPage: React.FC = () => {
  const initialFilters: FiltersState = {
    skill: [],
    gender: [],
    location: [],
    filterType: [],
  }
  const [filters, setFilters] = React.useState<FiltersState>(initialFilters)

  const handleFiltersChange = (filters: FiltersState) => {
    setFilters(filters)
  }

  return (
    <FilterTab onFiltersChange={handleFiltersChange}></FilterTab>
  )
}
