import type { RefObject } from 'react'

export interface RegisterModalContentStepTwoProps {
  onSubmit: () => void
  onBack: () => void
  nameValue: RefObject<string | null>
  dateValue: RefObject<Date | null>
  genderValue: RefObject<string | null>
  locationValue: RefObject<string | null>
  toLearnValue: RefObject<string[] | null>
  toSubLearnValue: RefObject<string[] | null>
}
