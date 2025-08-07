import React, { useState } from 'react';
import styles from './styles.module.scss';
import { FiltersTagsProps } from './FiltersTags.types';
import { useSelector } from 'react-redux'
import { selectFilterTypes, selectGenders, selectLocations } from '../../services/slices/filter/filterSlice'
import { selectAllCategories } from '../../services/slices/skill/skillSlice'
import { useFilters } from '../../shared/hooks/useFilters'
import { FiltersTag } from '@uiComponents/FiltersTag';

export const FiltersTags: React.FC<FiltersTagsProps> = ({ onFiltersChange, filters, setFilters }) => {
  const skills = useSelector(selectAllCategories)
  const skillSubcategories = skills.filter(skill => skill.children?.length > 0).flatMap(skill => skill.children)
  const locations = useSelector(selectLocations)
  const filterTypes = useSelector(selectFilterTypes)
  const genders = useSelector(selectGenders)

  const {
    toggleFilter,
    clearAllFilters,
  } = useFilters({ onChange: onFiltersChange, skillsMap: skills, filters, setFilters })

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    skills?.reduce((acc, filter) => {
      acc[filter.id] = false
      return acc
    }, {} as Record<string, boolean>),
  )

  return (
    <div className={styles.container}>
      {filters.gender[0] !== "notSpecified" &&
        <FiltersTag
          text={`Пол: ${genders.find(el => el.id === filters.gender[0]).name}`}
          onClick={()=>{toggleFilter('gender', filters.gender[0])}}
        />
      }
      {filters.locations.length > 0 &&
        filters.locations.map((city) => {
          return <FiltersTag
          text={city}
          onClick={()=>{toggleFilter('locations', city)}}
        />
        })
      }
      {filters.skill.length > 0 &&
        filters.skill.filter(skill => skill?.length > 0).map((skill) => {
          const skillName = skills.find(el => el.id === skill)?.name
          if (skillName) {
            return <FiltersTag
              text={skillName}
              onClick={()=>{toggleFilter('skill', skill)}}
              />
          } else {
            const subSkillName = skillSubcategories.find(el => el.id === skill)?.name
            return <FiltersTag
              text={subSkillName}
              onClick={()=>{}}
            />
          }
        })
      }
    </div>
  )
};