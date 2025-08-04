export interface RegisterStepThreeProps {
  type: 'stepOne' | 'stepTwo' | 'stepThree'
  onBack: () => void
  onSubmit: () => void
}
