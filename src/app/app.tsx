import { CheckboxInput } from '@uiComponents/CheckboxInput/CheckboxInput'
import React from 'react'

export function App() {
  const [active, setActive] = React.useState(true)

  const options = [
    'вертолет',
    '455',
    'трубы',
  ]

  return (
    <>
      <CheckboxInput
        active={active}
        onChange={() => setActive(!active)}
        options={options}
      >
        Творчество и искусство
      </CheckboxInput>
    </>

  )
}
