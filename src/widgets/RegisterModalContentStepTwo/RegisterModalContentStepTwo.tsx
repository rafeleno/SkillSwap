import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { RegisterModalContentStepTwoProps } from './RegisterModalContentStepTwo.types'
import sexData from '@databases/sex.json'
import skillsData from '@databases/skills_dropdown.json'
import townsData from '@databases/towns.json'
import { Datepicker } from '@uiComponents/Datepicker'
import { Dropdown } from '@uiComponents/Dropdown'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import userInfoPng from '../../assets/images/modalImages/user-info.png';
import { useValidation } from '../../shared/hooks/useValidation';
import { RegisterContext } from '../../shared/contexts/RegisterContext/RegisterContext'

export const RegisterModalContentStepTwo: React.FC<RegisterModalContentStepTwoProps> = ({
  onNext,
  onPrev
}) => {
  const { stepTwoStates } = useContext(RegisterContext);

  const subcategories = skillsData.flatMap(item => item.subcategory)

  const [nameValue, setNameValue] = stepTwoStates.nameState;
  const [dateValue, setDateValue] = stepTwoStates.dateState;
  const [genderValue, setGenderValue] = stepTwoStates.genderState;
  const [locationValue, setLocationValue] = stepTwoStates.locationState;
  const [toLearnValue, setToLearnValue] = stepTwoStates.toLearnState;
  const [toSubLearnValue, setToSubLearnValue] = stepTwoStates.toSabLearnState;

  const isValid = useValidation([
    nameValue !== null,
    dateValue !== null,
    genderValue !== null,
    locationValue !== null,
    toLearnValue.length > 0,
    toSubLearnValue.length > 0
  ]);

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
            onClick={onPrev}
          >
            Назад
          </MainButton>

          <MainButton
            type="primary"
            onClick={onNext}
            disabled={!isValid}
          >
            Продолжить
          </MainButton>
        </div>
      </div>

      <div className={styles.onboarding}>
        <img src={userInfoPng} alt="" />
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
