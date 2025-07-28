import type { InputProps } from '@uiComponents/PrimaryTextInput/Input.types'
import type { RegisterModalContentProps, TInitialInputs } from './RegisterModalContent.types'
import light from '@images/modalImages/light-bulb.png'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import React from 'react'
import styles from './styles.module.scss'

const stepOneInputs: TInitialInputs[] = [
  {
    type: 'email',
    placeholder: 'Введите Email',
    label: 'Email',
  },
  {
    type: 'password',
    placeholder: 'Придумайте надёжный пароль',
    label: 'Пароль',
  },
]

const imagesByType = {
  stepOne: {
    image: light,
    alt: 'Лампочка',
  },
}

export const RegisterModalContent: React.FC<RegisterModalContentProps> = ({
  type,
  onSubmit,
  emailState,
  passwordState,
}: RegisterModalContentProps) => {
  let inputs: InputProps[] = []
  const stepOneStates = [emailState, passwordState]

  switch (type) {
    case 'stepOne':
      inputs = stepOneInputs.map((input, index) => ({ ...input, state: stepOneStates[index] }))
      break
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        {type === 'stepOne'
          && (
            <div className={styles.additionalButtons}>
              <MainButton
                type="secondary"
                onClick={() => { }}
                leftIconId="google"
              >
                Продолжить с Google
              </MainButton>
              <MainButton
                type="secondary"
                onClick={() => { }}
                leftIconId="apple"
              >
                Продолжить с Apple
              </MainButton>
            </div>
          )}
        <fieldset className={styles.fieldset}>
          {type === 'stepOne' && <legend className={styles.legend}>или</legend>}
          {
            inputs.map(input => (
              <PrimaryTextInput {...input} />
            ))
          }
        </fieldset>
        {type === 'stepOne' && (
          <MainButton type="primary" onClick={onSubmit}>
            Далее
          </MainButton>
        )}
      </form>
      <div className={styles.info}>
        <img src={imagesByType[type].image} alt={imagesByType[type].alt} className={styles.infoImage} />
        <div className={styles.infoText}>
          <h3>
            {type === 'stepOne' && 'Добро пожаловать в SkillSwap!'}
          </h3>
          <p>
            {type === 'stepOne' && 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'}
          </p>
        </div>
      </div>
    </div>
  )
}
