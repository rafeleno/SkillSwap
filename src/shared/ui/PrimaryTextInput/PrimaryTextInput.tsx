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

  const getDefaultValues = () => {
    switch (type) {
      case 'password':
        return {
          label: 'Пароль',
          placeholder: 'Введите ваш пароль',
          inputType: showPassword ? 'text' : 'password',
        }
      case 'email':
        return {
          label: 'Email',
          placeholder: 'Введите ваш email',
          inputType: 'email',
        }
      case 'edit':
      case 'regular':
        return {
          label: label || '',
          placeholder: placeholder || '',
          inputType: 'text',
        }
      default:
        return {
          label: '',
          placeholder: '',
          inputType: 'text',
        }
    }
  }

  const defaultValues = getDefaultValues()

  const getValidationError = () => {
    if (!value)
      return null

    switch (type) {
      case 'password':
        return value.length < 8 ? 'Пароль должен содержать не менее 8 знаков' : null
      case 'email':
        return !EMAIL_REGEX.test(value) ? 'Введите корректный email' : null
      default:
        return null
    }
  }

  const validationError = getValidationError()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  const renderIcon = () => {
    switch (type) {
      case 'password':
        return (
          <div className={`${styles['icon-container']} ${styles.active}`}>
            <IconButton
              name={showPassword ? 'eye-slash' : 'eye'}
              onClick={togglePasswordVisibility}
            />
          </div>
        )
      case 'edit':
        return (
          <div className={`${styles['icon-container']} ${styles.inactive}`}>
            <IconButton
              name="edit"
              onClick={() => {}}
            />
          </div>
        )
      default:
        return null
    }
  }

  const inputClasses = `
    ${styles.input}
    ${isFocused ? styles.focused : ''}
    ${validationError ? styles.error : ''}
    ${(type === 'password' || type === 'edit') ? styles['with-icon'] : ''}
  `.trim()

  return (
    <div className={styles.container}>
      {defaultValues.label && (
        <label className={styles.label} htmlFor={`input-${type}`}>
          {defaultValues.label}
        </label>
      )}

      <div className={styles['input-wrapper']}>
        <input
          id={`input-${type}`}
          type={defaultValues.inputType}
          value={value}
          placeholder={defaultValues.placeholder}
          className={inputClasses}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {renderIcon()}
      </div>

      {validationError && (
        <div className={styles['error-message']}>
          {validationError}
        </div>
      )}
    </div>
  )
}
