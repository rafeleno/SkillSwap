import type { Skill } from '@widgetComponents/UserCard/UserCard.types'
import type { FormEventHandler } from 'react'
import type { RegisterModalProps } from './RegisterModal.types'
import { RegisterModalContent } from '@uiComponents/RegisterModalContent'
import { RegisterStepThree } from '@uiComponents/RegisterStepThree'
import { RegisterModalContentStepTwo } from '@widgetComponents/RegisterModalContentStepTwo'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectAllCategories } from '../../services/slices/skill/skillSlice'
import { registerUser } from '../../services/slices/user/thunks'
import { useDispatch, useSelector } from '../../services/store'
import { RegisterContext } from '../../shared/contexts/RegisterContext/RegisterContext'
import styles from './styles.module.scss'

export const RegisterModal: React.FC<RegisterModalProps> = ({ totalSteps = 3 }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const {
    stepOneStates,
    stepTwoStates,
    stepThreeStates,
  } = useContext(RegisterContext)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const allCategories = useSelector(selectAllCategories)

  const transformToSkill = (id: string): Skill => {
    const skillInData = allCategories.find(cat => cat.id === id)
    return {
      skillId: skillInData.id,
      subcategoryId: skillInData.parent,
      name: skillInData.name,
    }
  }
  // export interface ICategory {
  //   id: string
  //   name: string
  //   parent: string | null
  //   children: ISkill[]
  // }

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()

    const images = stepThreeStates.filesState ? stepThreeStates.filesState : []
    // const avatar = stepTwoStates.avatarState ? stepTwoStates.avatarState : null
    const base64Images = []

    // Обработчик загрузки изображений
    images.forEach((_, index) => {
      const reader = new FileReader()

      reader.onload = function () {
        base64Images[index] = reader.result
      }
    })

    const userData = {
      id: '666', // Сделать автоматическим
      avatar: stepTwoStates.avatarState[0],
      name: stepTwoStates.nameState[0],
      location: stepTwoStates.locationState[0],
      age: stepTwoStates.dateState[0],
      gender: stepTwoStates.genderState[0],
      likes: 0,
      description: '',
      skillCanTeach: transformToSkill(stepThreeStates.selectedSubcategoryState[0].id),
      images: base64Images,
      subcategoriesWantToLearn: [transformToSkill(stepTwoStates.toSabLearnState[0].id)],
      favourites: [],
      email: stepOneStates.emailState[0],
      password: stepOneStates.passwordState[0],
    }
    dispatch(registerUser(userData)).then(() => {
      navigate('/')
    })

    // Пример отображения изображений
    // function renderPreviews(images) {
    //   previewsContainer.innerHTML = '';
    //   images.forEach((src) => {
    //     const img = document.createElement('img');
    //     img.src = src;
    //     img.style.width = '150px';
    //     img.style.marginRight = '10px';
    //     previewsContainer.appendChild(img);
    //   });
    // }
    // Загрузка при инициализации
    // const savedImages = JSON.parse(localStorage.getItem('uploadedImages'));
    // if (savedImages && savedImages.length) {
    //   renderPreviews(savedImages);
    // }

    // Пример отправки регистрации
    // dispatch(registerUserThunk({
    // ...stepOneStates,
    // ...stepTwoStates,
    // ...stepThreeStates
    // }))
  }

  return (
    <div>
      {/* <header className={styles.header}>
        <MainLogo />
        <MainButton
          type="tertiary"
          rightIconId="cross"
          onClick={onClose}
        >
          Закрыть
        </MainButton>
      </header> */}

      <div className={styles.progress}>
        <h2 className={styles.progressText}>
          Шаг
          {' '}
          {currentStep}
          {' '}
          из
          {' '}
          {totalSteps}
        </h2>
        <div className={styles.progressBar}>
          {Array.from({ length: totalSteps }, (_, index) => (
            <div
              key={index}
              className={`${styles.progressSegment} ${index < currentStep ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>

      <main className={styles.content}>
        {currentStep === 1
          && (
            <RegisterModalContent
              onNext={nextStep}
            />
          )}
        {currentStep === 2
          && (
            <RegisterModalContentStepTwo
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
        {currentStep === 3
          && (
            <RegisterStepThree
              onSubmit={onSubmit}
              onPrev={prevStep}
            />
          )}
      </main>
    </div>
  )
}
