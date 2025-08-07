import type { IOption } from '@uiComponents/Dropdown/Dropdown.types'
import type { useState } from 'react'
import type React from 'react'

export interface TRegisterContextProps {
  children: React.ReactNode
}

export interface TRegisterContext {
  stepOneStates: TStepOneStates
  stepTwoStates: TStepTwoStates
  stepThreeStates: TStepThreeStates
}

export type TStepOneStates = Record<string, ReturnType<typeof useState<string>>>

export interface TStepTwoStates {
  nameState: ReturnType<typeof useState<string>>
  dateState: ReturnType<typeof useState<Date | null>>
  genderState: ReturnType<typeof useState<string>>
  locationState: ReturnType<typeof useState<string>>
  toLearnState: ReturnType<typeof useState<IOption>>
  toSabLearnState: ReturnType<typeof useState<IOption>>
  categoriesState: ReturnType<typeof useState<IOption[]>>
  subcategoriesState: ReturnType<typeof useState<IOption[]>>
  avatarState: ReturnType<typeof useState<string | null>>
}

export interface TStepThreeStates {
  selectedCategoryState: ReturnType<typeof useState<IOption | null>>
  selectedSubcategoryState: ReturnType<typeof useState<IOption | null>>
  categoriesState: ReturnType<typeof useState<IOption[]>>
  subcategoriesState: ReturnType<typeof useState<IOption[]>>
  filesState: ReturnType<typeof useState<any[]>>
  dragActiveState: ReturnType<typeof useState<boolean>>
}
