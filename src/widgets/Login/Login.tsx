import type { LoginProps } from './Login.types'
import { MainButton } from '@uiComponents/MainButton'
import { PrimaryTextInput } from '@uiComponents/PrimaryTextInput'
import React from 'react'
import styles from './styles.module.scss'

export const Login: React.FC<LoginProps> = ({
  onSubmit,
  onRegister,
  onForgetPassword,
  emailState,
  passwordState,
}) => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.additionalButtons}>
          <MainButton type="secondary" onClick={() => {}} leftIconId="google">
            Продолжить с Google
          </MainButton>
          <MainButton type="secondary" onClick={() => {}} leftIconId="apple">
            Продолжить с Apple
          </MainButton>
        </div>

        <fieldset className={styles.fieldset}>
          <PrimaryTextInput
            type="email"
            state={emailState}
            placeholder="Введите email"
            label="Email"
          />
          <PrimaryTextInput
            type="password"
            state={passwordState}
            placeholder="Введите ваш пароль"
            label="Пароль"
          />
        </fieldset>

        <div className={styles.formSubmit}>
          <MainButton type="primary" onClick={onSubmit}>
            Войти
          </MainButton>

          <div className={styles.formLinks}>
            <button className={styles.formLinksButton} onClick={onRegister}>Зарегистрироваться</button>
            <button className={styles.formLinksButton} onClick={onForgetPassword}>Забыли пароль?</button>
          </div>
        </div>
      </form>

      <div className={styles.onboarding}>
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href="#icon-light-bulb" />
        </svg>

        <div className={styles.onboardingText}>
          <h3>С возвращением в SkillSwap!</h3>
          <p>Обменивайтесь знаниями и навыками с другими людьми</p>
        </div>
      </div>
    </div>
  )
}
