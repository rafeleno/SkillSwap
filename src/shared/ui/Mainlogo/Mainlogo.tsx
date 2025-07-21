import type { MainlogoProps } from './Mainlogo.types'
import React from 'react'
import styles from './styles.module.scss'
import '../../../assets/svg/sprites.svg'

export const Mainlogo: React.FC<MainlogoProps> = () => {
  return (
    <div className={styles.mainLogo}>
      <div className={styles.mainLogoContainer}>
        <svg className={styles.icon}>
          <use xlinkHref="#logo" />
        </svg>
      </div>
      <h2>SkillSwap</h2>
    </div>
  )
}
