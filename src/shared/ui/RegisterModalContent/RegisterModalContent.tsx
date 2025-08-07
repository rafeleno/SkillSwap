import type { InputProps } from '@uiComponents/PrimaryTextInput/Input.types'
import type { RegisterModalContentProps } from './RegisterModalContent.types'
import light from '@images/modalImages/light-bulb.png'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import React, { useContext } from 'react'
import { RegisterContext } from '../../contexts/RegisterContext/RegisterContext'
import { useValidation } from '../../hooks/useValidation'
import styles from './styles.module.scss'

export const RegisterModalContent: React.FC<RegisterModalContentProps> = ({
  onNext,
}) => {
  const { stepOneStates } = useContext(RegisterContext)

  const [password] = stepOneStates.passwordState
  const [email] = stepOneStates.emailState
  const isValid = useValidation([
    password.length > 7,
    /.[^\n\r@\u2028\u2029]*@.+\..+/.test(email),
  ])

  const inputs: InputProps[] = [
    {
      type: 'email',
      placeholder: 'Введите Email',
      label: 'Email',
      state: stepOneStates.emailState,
    },
    {
      type: 'password',
      placeholder: 'Придумайте надёжный пароль',
      label: 'Пароль',
      state: stepOneStates.passwordState,
    },
  ]

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.additionalButtons}>
          <MainButton type="secondary" onClick={() => { }} leftIconId="google">
            Продолжить с Google
          </MainButton>
          <MainButton type="secondary" onClick={() => { }} leftIconId="apple">
            Продолжить с Apple
          </MainButton>
        </div>

        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>или</legend>
          {inputs.map((input, index) => (
            <PrimaryTextInput key={index} {...input} />
          ))}
        </fieldset>

        <MainButton type="primary" onClick={onNext} disabled={!isValid}>
          Далее
        </MainButton>
      </form>

      <div className={styles.info}>
        <img src={light} alt="Лампочка" className={styles.infoImage} />
        <div className={styles.infoText}>
          <h3>
            Добро пожаловать в SkillSwap!
          </h3>
          <p>
            Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми
          </p>
        </div>
      </div>
    </div>
  )
}
