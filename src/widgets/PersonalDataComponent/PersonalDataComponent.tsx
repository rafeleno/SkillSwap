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
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateUserField } from '../../services/slices/user/userSlice'
import styles from './styles.module.scss'

export const PersonalDataComponent: React.FC<PersonalDataComponentProps> = () => {
  const userSelector = useSelector(selectCurrentUser)
  const { email, name, avatar, age: dateOfBirth, location, description, gender } = userSelector
  const emailState = useState(email)
  const nameState = useState(name)
  const [date, setDate] = useState(
    dateOfBirth ? new Date(dateOfBirth) : new Date(),
  )
  const [genderValue, setGenderValue] = useState<string | null>(gender)
  const [descriptionValue, setDescriptionValue] = useState<string | null>(description)
  const [locationValue, setLocationValue] = useState<string | null>(location)
  const [avatarValue, setAvatarValue] = useState<string | null>(avatar)

  const dispatch = useDispatch()

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result as string
        setAvatarValue(base64Image)
        dispatch(updateUserField({ field: avatar, value: base64Image }))
      }
      reader.readAsDataURL(file)
    }
  }

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
            value={descriptionValue}
            onChange={e => setDescriptionValue(e.target.value)}
            placeholder="Коротко опишите, чему можете научить"
            aria-label="Коротко опишите, чему можете научить"
          />
        </div>
        <MainButton
          type="primary"
          onClick={() => {
            dispatch(updateUserField({ field: 'description', value: description }))
            dispatch(updateUserField({ field: 'avatar', value: avatarValue }))
            dispatch(updateUserField({ field: 'name', value: nameState[0] }))
            dispatch(updateUserField({ field: 'location', value: locationValue }))
            dispatch(updateUserField({ field: 'age', value: date }))
            dispatch(updateUserField({ field: 'gender', value: genderValue }))
            dispatch(updateUserField({ field: 'email', value: emailState }))

            localStorage.setItem('user', JSON.stringify({
              description: descriptionValue,
              avatar: avatarValue,
              name: nameState[0],
              location: locationValue,
              age: date,
              gender: genderValue,
              email: emailState,
            }))
          }}
          aria-label="Продолжить"
        >
          Сохранить
        </MainButton>
      </div>
      <div className={styles.profileAvatarWrap}>
        {avatarValue && (
          <img src={removeLastEl(avatarValue)} alt="Аватар пользователя" className={styles.avatar} />
        )}
        {!avatarValue && (
          <svg
            className={styles['user-avatar']}
            width="244"
            height="244"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <use href="#icon-user-circle" />
          </svg>
        )}
        <div className={styles.galleryEdit}>
          <label htmlFor="avatar">
            <svg width="24" height="24">
              <use href="/sprites.svg#gallery-edit" />
            </svg>
            <input
              type="file"
              id="avatar"
              className={styles.hiddenInput}
              multiple={false}
              onChange={handleAvatarChange}
              aria-label="Выберите изображения навыка"
            />
          </label>
        </div>
      </div>
    </div>
  )
}
