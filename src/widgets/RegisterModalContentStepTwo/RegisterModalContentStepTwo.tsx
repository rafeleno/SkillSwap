import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { useState } from 'react'
import type { AppDispatch } from 'services/store'
import type { RegisterModalContentStepTwoProps } from './RegisterModalContentStepTwo.types'
import sexData from '@databases/sex.json'
import skillsData from '@databases/skills_dropdown.json'
import townsData from '@databases/towns.json'
import { Datepicker } from '@uiComponents/Datepicker'
import { Dropdown } from '@uiComponents/Dropdown'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import { set } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userInfoPng from '../../assets/images/modalImages/user-info.png'
import { selectAllCategories, selectSkillsStatus } from '../../services/slices/skill/skillSlice'
import { RegisterContext } from '../../shared/contexts/RegisterContext/RegisterContext'
import { useValidation } from '../../shared/hooks/useValidation'
import styles from './styles.module.scss'

export const RegisterModalContentStepTwo: React.FC<RegisterModalContentStepTwoProps> = ({
  onNext,
  onPrev,
}) => {
  const { stepTwoStates } = useContext(RegisterContext)

  // const subcategories = skillsData.flatMap(item => item.subcategory)
  const [subcategories, setSubcategories] = stepTwoStates.subcategoriesState
  const [categories, setCategories] = stepTwoStates.categoriesState
  const [selectedCategory, setSelectedCategory] = stepTwoStates.toLearnState
  const [selectedSubcategory, setSelectedSubcategory] = stepTwoStates.toSabLearnState

  const skillData = useSelector(selectAllCategories)
  const skillsStatus = useSelector(selectSkillsStatus)
  const dispatch = useDispatch<AppDispatch>()

  const handleSubcategoryChange = (option: IOption) => {
    setSelectedSubcategory(option)
  }

  // Загружаем данные о навыках при монтировании компонента
  useEffect(() => {
    if (skillData.length === 0 && skillsStatus === 'idle') {
    }
  }, [dispatch, skillData.length, skillsStatus])

  // Обновляем категории при получении данных из store
  useEffect(() => {
    if (skillData.length > 0) {
      const categoryOptions = skillData.map(category => ({
        id: category.id,
        value: category.name,
      }))
      setCategories(categoryOptions)
    }
  }, [skillData])

  /////////////////////////////////////////////
  /////////////////////////////////////////////

  const [nameValue, setNameValue] = stepTwoStates.nameState
  const [dateValue, setDateValue] = stepTwoStates.dateState
  const [genderValue, setGenderValue] = stepTwoStates.genderState
  const [locationValue, setLocationValue] = stepTwoStates.locationState
  const [toLearnValue, setToLearnValue] = stepTwoStates.toLearnState
  const [toSubLearnValue, setToSubLearnValue] = stepTwoStates.toSabLearnState
  const [avatar, setAvatar] = stepTwoStates.avatarState

  const handleCategoryChange = (option: IOption) => {
    setSelectedCategory(option)
    setSelectedSubcategory(null)
    const originalCategory = skillData.find(cat => cat.id === option.id)
    if (originalCategory && originalCategory.children) {
      const subcategoryOptions = originalCategory.children.map(sub => ({
        id: sub.id,
        value: sub.name,
      }))
      setSubcategories(subcategoryOptions)
    }
    else {
      setSubcategories([])
    }
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const base64Image = reader.result as string
        setAvatar(base64Image)
      }
      reader.readAsDataURL(file)
    }
  }

  const isValid = useValidation([
    nameValue !== null,
    dateValue !== null,
    genderValue !== null,
    locationValue !== null,
    toLearnValue !== null,
    toSubLearnValue !== null,
  ])

  return (
    <article className={styles.container}>
      <div className={styles.formContainer}>
        <div className={styles.iconContainer}>
          <label htmlFor="avatar" className={styles.label}>
            <input
              type="file"
              id="avatar"
              className={styles.hiddenInput}
              multiple={false}
              onChange={handleAvatarChange}
              aria-label="Выберите изображения навыка"
            />
            {avatar && (
              <img src={typeof avatar === 'string' ? avatar : ''} alt="Аватар пользователя" />
            )}
            {!avatar && (
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
            )}
            <svg
              className={styles.iconAdd}
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon-add" />
            </svg>
          </label>
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
            options={categories}
            selectedOption={selectedCategory}
            onChange={handleCategoryChange}
            label="Категория навыка, которому хотите научиться"
            searchable={false}
          />

          {/* TODO: Исправить передачу параметров, когда подправят dropdown */}
          <Dropdown
            options={subcategories}
            selectedOption={selectedSubcategory}
            onChange={handleSubcategoryChange}
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
