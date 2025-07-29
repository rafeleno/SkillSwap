import type { InputProps } from './Input.types'
import React, { useState } from 'react'
import { IconButton } from '../IconButton'

import styles from './styles.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

export const PrimaryTextInput: React.FC<InputProps> = ({
  type,
  state,
  placeholder,
  label,
}) => {
  const [value, setValue] = state
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const validationError = !value
    ? null
    : type === 'password'
      ? (value.length < 8 ? 'Пароль должен содержать не менее 8 знаков' : null)
      : type === 'email'
        ? (!EMAIL_REGEX.test(value) ? 'Введите корректный email' : null)
        : null

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const inputClasses = `
    ${styles.input}
    ${isFocused ? styles.focused : ''}
    ${validationError ? styles.error : ''}
    ${(type === 'password' || type === 'edit') ? styles['with-icon'] : ''}
  `.trim()

  return (
    <div className={styles.container}>
      {(type === 'password'
        ? 'Пароль'
        : type === 'email'
          ? 'Email'
          : label || '') && (
        <label htmlFor={`input-${type}`}>
          {type === 'password'
            ? 'Пароль'
            : type === 'email'
              ? 'Email'
              : label || ''}
        </label>
      )}

      <div className={styles['input-wrapper']}>
        <input
          id={`input-${type}`}
          type={type === 'password'
            ? (showPassword ? 'text' : 'password')
            : type === 'email' ? 'email' : 'text'}
          value={value}
          placeholder={type === 'password'
            ? 'Введите ваш пароль'
            : type === 'email'
              ? 'Введите ваш email'
              : placeholder || ''}
          className={inputClasses}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        {type === 'password'
          ? (
              <div className={`${styles['icon-container']} ${styles.active}`}>
                <IconButton
                  name={showPassword ? 'eye-slash' : 'eye'}
                  onClick={togglePasswordVisibility}
                />
              </div>
            )
          : type === 'edit'
            ? (
                <div className={`${styles['icon-container']} ${styles.inactive}`}>
                  <IconButton
                    name="edit"
                    onClick={() => {}}
                  />
                </div>
              )
            : null}
      </div>

      {validationError && (
        <div className={styles['error-message']}>
          {validationError}
        </div>
      )}
    </div>
  )
}
