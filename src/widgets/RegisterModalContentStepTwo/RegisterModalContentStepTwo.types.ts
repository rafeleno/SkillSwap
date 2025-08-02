export interface RegisterModalContentStepTwoProps {
  type: 'stepOne' | 'stepTwo' | 'stepThree'
  onSubmit: () => void
  onBack: () => void
}
