import type { RegisterModalProps } from './RegisterModal.types'
import { MainButton } from '@uiComponents/MainButton'
import { MainLogo } from '@uiComponents/MainLogo'
import React from 'react'
import styles from './styles.module.scss'

export const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const totalSteps = 3
  const currentStep = 1

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
          Шаг 1 из 3
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

      {/* Контент текущего шага, пусть пока будет так. Нам всеравно пофиг, что будет за контент */}
      <main className={styles.content}>
        <div>Контент шага 1 - Email и пароль</div>
      </main>
    </div>
  )
}
