import { Dropdown } from '@uiComponents/Dropdown'
import React from 'react'

const dropdownProps = [{
  id: 'unique-id1',
  value: '666',
}, {
  id: 'unique-id2',
  value: '777',
}, {
  id: 'unique-id3',
  value: '333',
}, {
  id: 'unique-id4',
  value: '444',
}, {
  id: 'unique-id5',
  value: '555',
}, {
  id: 'unique-id6',
  value: '333',
}, {
  id: 'unique-id7',
  value: '333',
}, {
  id: 'unique-id8',
  value: '333',
}, {
  id: 'unique-id9',
  value: '333',
}]

export function App() {
  const [currentOption, setCurrentOption] = React.useState(dropdownProps[0])
  return (
    <>
      <Dropdown options={dropdownProps} selectedOption={currentOption} label="Не будешь в спб проездом?" width={280} onChange={setCurrentOption} searchable={true} bordered={false} />
    </>
  )
}
