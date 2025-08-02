import type { MainLogoProps } from './MainLogo.types'
import React from 'react'
import styles from './styles.module.scss'

export const MainLogo: React.FC<MainLogoProps> = () => {
  return (
    // Убрала link
    <div className={styles.mainLogo}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}></span>
      </div>
      <h2 className={styles.text}>SkillSwap</h2>
    </div>
  )
}
