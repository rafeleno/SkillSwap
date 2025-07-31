export interface RegisterModalProps {
  onClose: () => void
}

// Типы для всех данных регистрации. Может вынести в глобальный types?
export interface RegistrationData {
  // Шаг 1
  email: string
  password: string

  // Шаг 2
  name: string
  birthDate: string
  gender: string
  city: string
  learningCategory: string
  learningSubcategory: string

  // Шаг 3
  skillTitle: string
  skillCategory: string
  skillSubcategory: string
  skillDescription: string
  skillImages: File[]
}

export type StepType = 1 | 2 | 3
