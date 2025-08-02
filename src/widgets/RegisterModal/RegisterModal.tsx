import type { RegisterModalProps } from './RegisterModal.types'
import { MainButton } from '@uiComponents/MainButton'
import { MainLogo } from '@uiComponents/MainLogo'
import { RegisterModalContent } from '@uiComponents/RegisterModalContent'
import React, { useState } from 'react'
import { selectAllCategories } from '../../services/slices/skill/skillSlice'
import { selectCurrentUser, updateUserField } from '../../services/slices/users/userSlice'
import { useDispatch, useSelector } from '../../services/store'
import styles from './styles.module.scss'

export const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, totalSteps = 3 }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [password, setPassword] = useState('') // Только для pass
  const user = useSelector(selectCurrentUser)
  const categories = useSelector(selectAllCategories)
  const dispatch = useDispatch()

  const updateField = (field: keyof typeof user, value: any) => {
    dispatch(updateUserField({ field, value }))
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  const stepTypeMap = {
    1: 'stepOne',
    2: 'stepTwo',
    3: 'stepThree',
  } as const

  const getStepType = () => stepTypeMap[currentStep as keyof typeof stepTypeMap] || 'stepOne'

  return (
    <div>
      <header className={styles.header}>
        <MainLogo />
        <MainButton
          type="tertiary"
          rightIconId="cross"
          onClick={onClose}
        >
          Закрыть
        </MainButton>
      </header>

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
        <RegisterModalContent
          type={getStepType()}
          onSubmit={nextStep}
          onPrev={prevStep}

          // Данные из Redux
          user={user}
          categories={categories}
          onUpdateUser={updateField}

          // Локальные данные
          passwordState={[password, setPassword]}
        />
      </main>
    </div>
  )
}
