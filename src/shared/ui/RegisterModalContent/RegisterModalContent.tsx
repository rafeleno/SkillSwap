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
  // Заглушки
  stepTwo: {
    image: light,
    alt: 'Шаг 2',
  },
  stepThree: {
    image: light,
    alt: 'Шаг 3',
  },
}

export const RegisterModalContent: React.FC<RegisterModalContentProps> = ({
  type,
  onSubmit,
  // onPrev,
  user,
  // categories,
  onUpdateUser,
  passwordState,
}) => {
  const [password, setPassword] = passwordState

  let inputs: InputProps[] = []

  switch (type) {
    case 'stepOne':
      inputs = stepOneInputs.map((input) => {
        if (input.type === 'email') {
          return {
            ...input,
            state: [user?.email || '', (value: string) => onUpdateUser('email', value)],
          }
        }
        if (input.type === 'password') {
          return {
            ...input,
            state: [password, setPassword],
          }
        }
        return {
          ...input,
          state: [password, setPassword],
        }
      })
      break
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        {/* Контент шага 1 */}
        {type === 'stepOne' && (
          <>
            <div className={styles.additionalButtons}>
              <MainButton type="secondary" onClick={() => {}} leftIconId="google">
                Продолжить с Google
              </MainButton>
              <MainButton type="secondary" onClick={() => {}} leftIconId="apple">
                Продолжить с Apple
              </MainButton>
            </div>

            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>или</legend>
              {inputs.map((input, index) => (
                <PrimaryTextInput key={index} {...input} />
              ))}
            </fieldset>

            <MainButton type="primary" onClick={onSubmit}>
              Далее
            </MainButton>
          </>
        )}

        {/* Заглушки для других шагов */}
        {type === 'stepTwo' && <div>Контент 2го шага</div>}
        {type === 'stepThree' && <div>Контент 3го шага</div>}
      </form>

      <div className={styles.info}>
        <img src={imagesByType[type].image} alt={imagesByType[type].alt} className={styles.infoImage} />
        <div className={styles.infoText}>
          <h3>
            {type === 'stepOne' && 'Добро пожаловать в SkillSwap!'}
          </h3>
          <p>
            {type === 'stepOne' && 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми'}
          </p>
        </div>
      </div>
    </div>
  )
}
