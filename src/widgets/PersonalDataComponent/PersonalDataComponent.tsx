import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { PersonalDataComponentProps } from './PersonalDataComponent.types'
import sexData from '@databases/sex.json'
import townsData from '@databases/towns.json'
import { Datepicker } from '@uiComponents/Datepicker'
import { Dropdown } from '@uiComponents/Dropdown'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import { removeLastEl } from '@widgetComponents/Header/Header'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../services/slices/user/userSlice'
import styles from './styles.module.scss'

// TODO: Вынести в общие функции
export function getFirstWord(value: string): string {
  return value.trim().split(/\s+/)[0] || ''
}

export const PersonalDataComponent: React.FC<PersonalDataComponentProps> = () => {
  const userSelector = useSelector(selectCurrentUser)
  const { email, name, avatar, age: dateOfBirth, location, description, gender } = userSelector
  const emailState = useState(email)
  const nameState = useState(name)
  const [date, setDate] = useState(new Date(dateOfBirth))
  const [genderValue, setGenderValue] = useState<string | null>(gender)
  const [locationValue, setLocationValue] = useState<string | null>(location)

  console.log(locationValue)

  return (
    <div className={styles.profile}>
      <div className={styles.profileForm}>
        <div className={styles.profileFormInputWrap}>
          <PrimaryTextInput
            type="email"
            state={emailState}
            label="Почта"
          />
        </div>
        <div className={styles.changePassword}>Изменить пароль</div>
        <div className={styles.profileFormInputWrap}>
          <PrimaryTextInput
            type="regular"
            state={nameState}
            label="имя"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'end' }}>
          <div className={styles.profileFormInputWrap}>
            <Datepicker selectedDate={date} setSelectedDate={setDate} />
          </div>
          <div className={styles.profileFormInputWrap}>
            <label
              className={styles.label}
              aria-label="Пол"
            >
              Пол
            </label>
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
        </div>
        <div className={styles.profileFormInputWrap}>
          <label
            className={styles.label}
            aria-label="Город"
          >
            Город
          </label>
          <Dropdown
            options={townsData}
            selectedOption={townsData.find(element => element.value.toLowerCase().trim() === locationValue?.toLowerCase().trim())}
            onChange={(option: IOption) => {
              setLocationValue(option.value)
            }}
            label="Город"
            placeholder={locationValue}
            searchable={true}
          />
        </div>
        <div className={styles.profileFormInputWrap}>
          <label
            htmlFor="description"
            className={styles.label}
            aria-label="Описание"
          >
            Описание
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            rows={4}
            value={description}
            placeholder="Коротко опишите, чему можете научить"
            aria-label="Коротко опишите, чему можете научить"
          />
        </div>
        <MainButton
          type="primary"
          onClick={() => {}}
          aria-label="Продолжить"
        >
          Сохранить
        </MainButton>
      </div>
      <div className={styles.profileAvatarWrap}>
        <img
          className={styles.avatar}
          src={removeLastEl(avatar)}
          alt=""
        />
        <div className={styles.galleryEdit}>
          <svg width="24" height="24">
            <use href="/sprites.svg#gallery-edit" />
          </svg>
        </div>
      </div>
    </div>
  )
}
