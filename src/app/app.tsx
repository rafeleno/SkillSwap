import { FiltersPanel } from '@uiComponents/CheckboxInput/Checkboxinput'
import React from 'react'

export function App() {
  // const [active, setActive] = React.useState(true)
  // const [opened, setOpened] = React.useState(true)

  // const options = [
  //   'вертолет',
  //   '455',
  //   'трубы',
  // ]

  const [_, setFilters] = React.useState({
    skill: [],
    gender: [],
    location: [],
    filterType: [],
  })

  return (
  // <>
  //   <CheckboxInput
  //     active={active}
  //     opened={opened}
  //     onChange={() => setActive(!active)}
  //     onOpen={() => setOpened(!opened)}
  //     options={options}
  //   >
  //     Творчество и искусство
  //   </CheckboxInput>

    <FiltersPanel onFiltersChange={setFilters} />

  )
}
