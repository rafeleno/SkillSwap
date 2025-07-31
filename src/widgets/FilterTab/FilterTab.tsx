import type { FilterTabProps } from './FilterTab.types'
import { CheckboxInput } from '@uiComponents/CheckboxInput/Checkboxinput'
import { CheckboxParentInput } from '@uiComponents/CheckboxParentInput'
import { RadioInput } from '@uiComponents/RadioInput'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectFilterTypes, selectGenders, selectLocations, selectSkills } from '../../services/slices/filter/filterSlice'
import { useFilters } from '../../shared/hooks/useFilters'
import styles from './styles.module.scss'

export const FilterTab: React.FC<FilterTabProps> = ({ onFiltersChange }) => {
  const skills = useSelector(selectSkills)
  const locations = useSelector(selectLocations)
  const filterTypes = useSelector(selectFilterTypes)
  const genders = useSelector(selectGenders)

  const {
    filters,
    toggleFilter,
    clearAllFilters,
  } = useFilters({ onChange: onFiltersChange, skillsMap: skills })

  const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
    skills?.reduce((acc, filter) => {
      acc[filter.id] = false
      return acc
    }, {} as Record<string, boolean>),
  )

  return (
    <div className={styles['filters-panel']}>

      <h2 className={styles.title}>Фильтры</h2>
      <ul className={styles['filter-radio-tab']}>
        {filterTypes.map(filterType => (
          <li key={filterType.id} className={styles.option}>
            <RadioInput
              checked={filters.filterType?.includes(filterType.id)}
              name={filterType.name}
              onChange={() => toggleFilter('filterType', filterType.id)}
            >
              {filterType.name}
            </RadioInput>
          </li>
        ))}
      </ul>
      <h3 className={styles['sub-title']}>Навыки</h3>
      <ul className={styles['filter-checkbox-tab']}>
        {skills.filter(item => item.parent === null).map(category => (
          <>
            <CheckboxParentInput
              id={category.id}
              checked={filters.skill?.includes(category.id)}
              name={category.name}
              onChange={() => toggleFilter('skill', category.id)}
              openState={openStates[category.id]}
              setOpenState={setOpenStates}
            >
              {category.name}
            </CheckboxParentInput>

            {category.children.length > 0 && openStates[category.id] && (
              <ul className={styles.options}>
                {category.children.map(subCategory => (
                  <li key={subCategory.id} className={styles.option}>
                    <CheckboxInput
                      checked={filters.skill?.includes(subCategory.id)} // Костыль
                      name={subCategory.name}
                      onChange={() => toggleFilter('skill', subCategory.id)}
                    >
                      {subCategory.name}
                    </CheckboxInput>
                  </li>
                ))}
              </ul>
            )}
          </>
        ))}
      </ul>

      <h3 className={styles['sub-title']}>Пол автора</h3>
      <ul className={styles['filter-radio-tab']}>
        {genders.map(gender => (
          <li key={gender.id} className={styles.option}>
            <RadioInput
              checked={filters.gender?.includes(gender.id)}
              name={gender.name}
              onChange={() => toggleFilter('gender', gender.id)}
            >
              {gender.name}
            </RadioInput>
          </li>
        ))}
      </ul>

      <h3 className={styles['sub-title']}>Город</h3>
      <ul className={styles['filter-checkbox-tab']}>
        {locations.map(location => (
          <li key={location.id} className={styles.option}>
            <CheckboxInput
              checked={filters.location?.includes(location.id)}
              name={location.name}
              onChange={() => toggleFilter('location', location.id)}
            >
              {location.name}
            </CheckboxInput>
          </li>
        ))}
      </ul>
    </div>

  )
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  // // TODO: Тут можно сделать отдельно для фильров родителей
  // const [openStates, setOpenStates] = useState<Record<string, boolean>>(() =>
  //   skills?.reduce((acc, filter) => {
  //     acc[filter.id] = false
  //     return acc
  //   }, {} as Record<string, boolean>),
  // )

  // return (
  //   <div className={styles['filters-panel']}>

  //     <h2 className={styles.title}>Фильтры</h2>
  //     <ul className={styles['filter-radio-tab']}>
  //       {filterTypes.map(filterType => (
  //         <li key={filterType.id} className={styles.option}>
  //           <RadioInput
  //             checked={filters.filterType?.includes(filterType.id)}
  //             name={filterType.name}
  //             onChange={() => toggleFilter({ type: 'filterType', id: filterType.id })}
  //           >
  //             {filterType.name}
  //           </RadioInput>
  //         </li>
  //       ))}
  //     </ul>

  //     <h3 className={styles['sub-title']}>Навыки</h3>
  //     <ul className={styles['filter-checkbox-tab']}>
  //       {skills.filter(item => item.parent === null).map(category => (
  //         <>
  //           <CheckboxParent
  //             id={category.id}
  //             checked={filters.skill?.includes(category.id)}
  //             name={category.name}
  //             onChange={() => toggleFilter({ type: 'skill', id: category.id })}
  //             openState={openStates[category.id]}
  //             setOpenState={setOpenStates}
  //           >
  //             {category.name}
  //           </CheckboxParent>

  //           {category.children.length > 0 && openStates[category.id] && (
  //             <ul className={styles.options}>
  //               {category.children.map(subCategory => (
  //                 <li key={subCategory.id} className={styles.option}>
  //                   <Checkbox
  //                     checked={filters.skill?.includes(subCategory.id)} // Костыль
  //                     name={subCategory.name}
  //                     onChange={() => toggleFilter({ type: 'skill', id: subCategory.id })}
  //                   >
  //                     {subCategory.name}
  //                   </Checkbox>
  //                 </li>
  //               ))}
  //             </ul>
  //           )}
  //         </>
  //       ))}
  //     </ul>

  //     <h3 className={styles['sub-title']}>Пол автора</h3>
  //     <ul className={styles['filter-radio-tab']}>
  //       {genders.map(gender => (
  //         <li key={gender.id} className={styles.option}>
  //           <RadioInput
  //             checked={filters.gender?.includes(gender.id)}
  //             name={gender.name}
  //             onChange={() => toggleFilter({ type: 'gender', id: gender.id })}
  //           >
  //             {gender.name}
  //           </RadioInput>
  //         </li>
  //       ))}
  //     </ul>

  //     <h3 className={styles['sub-title']}>Город</h3>
  //     <ul className={styles['filter-checkbox-tab']}>
  //       {locations.map(location => (
  //         <li key={location.id} className={styles.option}>
  //           <Checkbox
  //             checked={filters.location?.includes(location.id)}
  //             name={location.name}
  //             onChange={() => toggleFilter({ type: 'location', id: location.id })}
  //           >
  //             {location.name}
  //           </Checkbox>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // )
}
