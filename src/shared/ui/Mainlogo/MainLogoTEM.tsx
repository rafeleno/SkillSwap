import type { MainLogoProps } from './MainLogoTEM.types'
import React from 'react'
import styles from './styles.module.scss'
import '../../../assets/svg/sprites.svg'

export const MainLogo: React.FC<MainLogoProps> = () => {
  return (
    <div className={styles.mainLogo}>
      <div className={styles.mainLogoContainer}>
        <svg className={styles.icon}>
          <use xlinkHref="/sprites.svg#logo-star" />
        </svg>
      </div>
      <h2>SkillSwap</h2>
    </div>
  )
}
