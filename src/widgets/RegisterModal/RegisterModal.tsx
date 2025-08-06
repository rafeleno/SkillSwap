import type { FormEventHandler } from 'react'
import type { RegisterModalProps } from './RegisterModal.types'
import { RegisterModalContent } from '@uiComponents/RegisterModalContent'
import { RegisterStepThree } from '@uiComponents/RegisterStepThree'
import { RegisterModalContentStepTwo } from '@widgetComponents/RegisterModalContentStepTwo'
import React, { useCallback, useContext, useState } from 'react'
import { selectAllCategories } from '../../services/slices/skill/skillSlice'
import { selectCurrentUser, updateUserField } from '../../services/slices/user/userSlice'
import { useDispatch, useSelector } from '../../services/store'
import { RegisterContext } from '../../shared/contexts/RegisterContext/RegisterContext'
import { useValidation } from '../../shared/hooks/useValidation'
import styles from './styles.module.scss'

export const RegisterModal: React.FC<RegisterModalProps> = ({ totalSteps = 3 }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const {
    stepOneStates,
    stepTwoStates,
    stepThreeStates,
  } = useContext(RegisterContext)

  const dispatch = useDispatch()

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()

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
