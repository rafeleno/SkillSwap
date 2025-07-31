import type { DatepickerProps } from './Datepicker.types'
import { Dropdown } from '@uiComponents/Dropdown'
import { MainButton } from '@uiComponents/MainButton'
import { ru } from 'date-fns/locale'
import React, { useRef } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import styles from './styles.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('ru', ru)

export const Datepicker: React.FC<DatepickerProps> = ({ selectedDate, setSelectedDate }) => {
  const datePickerRef = useRef<any>(null)

  const handleCancel = () => {
    setSelectedDate(null)
    datePickerRef.current?.setOpen(false)
  }

  const handleConfirm = () => {
    setSelectedDate(selectedDate)
    datePickerRef.current?.setOpen(false)
  }

  const currentYear = new Date().getFullYear()

  const months = Array.from({ length: 12 }, (_, i) => ({
    id: i.toString(),
    value: new Date(0, i).toLocaleString('ru', { month: 'long' }),
  }))

  const years = Array.from({ length: 100 }, (_, i) => {
    const year = currentYear - i
    return { id: year.toString(), value: year.toString() }
  })

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Дата рождения</label>

      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date && date > new Date()) {
            setSelectedDate(null)
          }
          else {
            setSelectedDate(date)
          }
        }}
        locale="ru"
        maxDate={new Date()}
        dateFormat="dd.MM.yyyy"
        shouldCloseOnSelect={false}
        calendarStartDay={1}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className={styles.input}
        renderCustomHeader={({ date, changeYear, changeMonth }) => {
          const selectedMonth = months.find(m => m.id === date.getMonth().toString())
          const selectedYear = years.find(y => y.id === date.getFullYear().toString())

          return (
            <div className={styles['custom-header']}>
              <Dropdown
                options={months}
                selectedOption={selectedMonth}
                onChange={option => changeMonth(Number(option.id))}
                label="Месяц"
                searchable={false}
                bordered={false}
                width={130}
              />

              <Dropdown
                options={years}
                selectedOption={selectedYear}
                onChange={option => changeYear(Number(option.value))}
                label="Год"
                searchable={false}
                bordered={false}
                width={105}
              />
            </div>
          )
        }}
        calendarContainer={({ children }) => (
          <div className={styles['calendar-container']}>
            {children}
            <div className={styles.footer}>
              <MainButton onClick={handleCancel} type="secondary">
                Отменить
              </MainButton>
              <MainButton onClick={handleConfirm} type="primary">
                Выбрать
              </MainButton>
            </div>
          </div>
        )}
      />
    </div>
  )
}
