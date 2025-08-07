import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { TRegisterContext, TRegisterContextProps } from './types'
import React, { createContext, useState } from 'react'

export const RegisterContext = createContext<TRegisterContext>(undefined)

export function RegisterContextProvider({ children }: TRegisterContextProps) {
  return (
    <RegisterContext.Provider
      value={{
        stepOneStates: {
          passwordState: useState(''),
          emailState: useState(''),
        },
        stepTwoStates: {
          nameState: useState<string>(''),
          dateState: useState<Date | null>(null),
          genderState: useState<string>(''),
          locationState: useState<string>(''),
          toLearnState: useState<IOption | null>(null),
          toSabLearnState: useState<IOption | null>(null),
          categoriesState: useState<IOption[]>([]),
          subcategoriesState: useState<IOption[]>([]),
          avatarState: useState<string | null>(null),
        },
        stepThreeStates: {
          selectedCategoryState: useState<IOption | null>(null),
          selectedSubcategoryState: useState<IOption | null>(null),
          categoriesState: useState<IOption[]>([]),
          subcategoriesState: useState<IOption[]>([]),
          filesState: useState([]),
          dragActiveState: useState(false),
        },
      }}
    >
      {children}
    </RegisterContext.Provider>
  )
}
