import { MainButton } from '@uiComponents/MainButton'
import { ru } from 'date-fns/locale'
import React, { useRef, useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'

import styles from './styles.module.scss'
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('ru', ru)

export const Datepicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [tempDate, setTempDate] = useState<Date | null>(null)
  const datePickerRef = useRef<any>(null)

  const handleCancel = () => {
    setTempDate(selectedDate)
    datePickerRef.current?.setOpen(false)
  }

  const handleConfirm = () => {
    setSelectedDate(tempDate)
    datePickerRef.current?.setOpen(false)
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>Дата рождения</label>

      <DatePicker
        ref={datePickerRef}
        selected={selectedDate}
        onChange={(date: Date | null) => setTempDate(date)}
        onChangeRaw={e => e.preventDefault()}
        locale="ru"
        maxDate={new Date()}
        dateFormat="dd.MM.yyyy"
        shouldCloseOnSelect={false}
        calendarStartDay={1}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        className={styles.input}
        renderCustomHeader={({ date, changeYear, changeMonth }) => (
          <div className={styles.customHeader}>
            <select
              className={styles.test}
              value={date.getMonth()}
              onChange={e => changeMonth(+e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('ru', { month: 'long' })}
                </option>
              ))}
            </select>

            <select
              className={styles.test}
              value={date.getFullYear()}
              onChange={e => changeYear(+e.target.value)}
            >
              {Array.from({ length: 100 }, (_, i) => {
                const year = currentYear - i
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              })}
            </select>
          </div>
        )}
        calendarContainer={({ children }) => (
          <div className={styles.calendarContainer}>
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
