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
  onSubmit,
  onBack,
  nameValue,
  dateValue,
  genderValue,
  locationValue,
  toLearnValue,
  toSubLearnValue,
}) => {
  const subcategories = skillsData.flatMap(item => item.subcategory)

  const toValidate = () => {
    return nameValue.current !== null && dateValue.current !== null
      && genderValue.current !== null && locationValue.current !== null
      && toLearnValue.current.length > 0 && toSubLearnValue.current.length > 0
  }

  const [isValid, setValid] = useState<boolean>(false)

  const submitButton = (
    <MainButton
      type="primary"
      onClick={onSubmit}
      disabled={!isValid}
    >
      Продолжить
    </MainButton>
  )

  useEffect(() => {}, [isValid])

  // Параметр state элемента PrimaryTextInput принимает только useState, однако в этот элемент передается useRef,
  // поэтому пришлось создать псевдостейт
  const nameState = () => {
    return [
      nameValue.current,
      (val: string) => {
        nameValue.current = val
        setValid(toValidate())
      },
    ]
  }

  return (
    <article className={styles.container}>
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
            state={nameState() as ReturnType<typeof useState<string>>}
            placeholder="Введите ваше имя"
            label="Имя"
          />

          <div className={styles.flexRow}>
            <Datepicker
              selectedDate={dateValue.current}
              setSelectedDate={(date: Date) => {
                dateValue.current = date
                setValid(toValidate())
              }}
            />

            <Dropdown
              options={sexData}
              selectedOption={sexData.find(element => element.value === genderValue.current)}
              onChange={(option: IOption) => {
                genderValue.current = option.value
                setValid(toValidate())
              }}
              label="Пол"
              searchable={false}
            />
          </div>

          <Dropdown
            options={townsData}
            selectedOption={townsData.find(element => element.value === genderValue.current)}
            onChange={(option: IOption) => {
              locationValue.current = option.value
              setValid(toValidate())
            }}
            label="Город"
            searchable={true}
          />

          {/* TODO: Исправить передачу параметров, когда подправят dropdown */}
          <Dropdown
            options={skillsData}
            selectedOption={skillsData.find(element => element.value === toLearnValue.current[0])}
            onChange={(option: IOption) => {
              toLearnValue.current = [option.value]
              setValid(toValidate())
            }}
            label="Категория навыка, которому хотите научиться"
            searchable={false}
          />

          {/* TODO: Исправить передачу параметров, когда подправят dropdown */}
          <Dropdown
            options={subcategories}
            selectedOption={subcategories.find(element => element.value === toSubLearnValue.current[0])}
            onChange={(option: IOption) => {
              toSubLearnValue.current = [option.value]
              setValid(toValidate())
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

          {submitButton}
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
    </article>
  )
}
