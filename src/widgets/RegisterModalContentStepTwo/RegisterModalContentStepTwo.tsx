import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { RegisterModalContentStepTwoProps } from './RegisterModalContentStepTwo.types'
import sexData from '@databases/sex.json'
import skillsData from '@databases/skills_dropdown.json'
import townsData from '@databases/towns.json'
import { Datepicker } from '@uiComponents/Datepicker'
import { Dropdown } from '@uiComponents/Dropdown'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

export const RegisterModalContentStepTwo: React.FC<RegisterModalContentStepTwoProps> = ({
  type,
  onSubmit,
  onBack,
}) => {
  const subcategories = skillsData.flatMap(item => item.subcategory)

  const [nameValue, setNameValue] = useState<string | null>(null)
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [genderValue, setGenderValue] = useState<string | null>(null)
  const [locationValue, setLocationValue] = useState<string | null>(null)
  const [toLearnValue, setToLearnValue] = useState<string[]>([])
  const [toSubLearnValue, setToSubLearnValue] = useState<string[]>([])

  const toValidate = () => {
    return nameValue !== null && dateValue !== null
      && genderValue !== null && locationValue !== null
      && toLearnValue.length > 0 && toSubLearnValue.length > 0
  }

  const [isValid, setValid] = useState<boolean>(toValidate())

  useEffect(() => {
    setValid(toValidate())
  }, [nameValue, dateValue, genderValue, locationValue, toLearnValue, toSubLearnValue])

  return (
    <article className={styles.container}>
      {
        type === 'stepTwo'
        && (
          <>
            <div className={styles.formContainer}>
              <div className={styles.iconContainer}>
                <svg
                  className={styles.iconUser}
                  width="54"
                  height="54"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon-user-circle" />
                </svg>
                <svg
                  className={styles.iconAdd}
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <use href="#icon-add" />
                </svg>
              </div>
              <form className={styles.registerForm}>
                <PrimaryTextInput
                  type="regular"
                  state={[nameValue, setNameValue] as ReturnType<typeof useState<string>>}
                  placeholder="Введите ваше имя"
                  label="Имя"
                />

                <div className={styles.flexRow}>
                  <Datepicker
                    selectedDate={dateValue}
                    setSelectedDate={(date: Date) => {
                      setDateValue(date)
                    }}
                  />

                  <Dropdown
                    options={sexData}
                    selectedOption={sexData.find(element => element.value === genderValue)}
                    onChange={(option: IOption) => {
                      setGenderValue(option.value)
                    }}
                    label="Пол"
                    searchable={false}
                  />
                </div>

                <Dropdown
                  options={townsData}
                  selectedOption={townsData.find(element => element.value === locationValue)}
                  onChange={(option: IOption) => {
                    setLocationValue(option.value)
                  }}
                  label="Город"
                  searchable={true}
                />

                {/* TODO: Исправить передачу параметров, когда подправят dropdown */}
                <Dropdown
                  options={skillsData}
                  selectedOption={skillsData.find(element => element.value === toLearnValue[0])}
                  onChange={(option: IOption) => {
                    setToLearnValue([option.value])
                  }}
                  label="Категория навыка, которому хотите научиться"
                  searchable={false}
                />

                {/* TODO: Исправить передачу параметров, когда подправят dropdown */}
                <Dropdown
                  options={subcategories}
                  selectedOption={subcategories.find(element => element.value === toSubLearnValue[0])}
                  onChange={(option: IOption) => {
                    setToSubLearnValue([option.value])
                  }}
                  label="Подкатегория навыка, которому хотите научиться"
                  searchable={false}
                />

              </form>

              <div className={styles.flexRow}>
                <MainButton
                  type="secondary"
                  onClick={onBack}
                >
                  Назад
                </MainButton>

                <MainButton
                  type="primary"
                  onClick={onSubmit}
                  disabled={!isValid}
                >
                  Продолжить
                </MainButton>
              </div>
            </div>

            <div className={styles.onboarding}>
              <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <use href="#icon-user-info" />
              </svg>
              <span>
                <h2>Расскажите немного о себе</h2>
                <p>
                  Это поможет другим людям лучше вас узнать,
                  <br />
                  чтобы выбрать для обмена
                </p>
              </span>
            </div>
          </>
        )
      }
    </article>
  )
}
