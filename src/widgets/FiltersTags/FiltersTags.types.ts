import type React from 'react'
import type { FiltersState } from '../../shared/hooks/useFilters'

export interface FiltersTagsProps {
    onFiltersChange: React.Dispatch<React.SetStateAction<any>>
    filters: FiltersState
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}