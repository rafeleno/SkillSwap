import type { MainLogoProps } from './MainLogo.types'
import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const MainLogo: React.FC<MainLogoProps> = () => {
  return (
    // Убрала link
    <Link to="/">
    <div className={styles.mainLogo}>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}></span>
      </div>
      <h2 className={styles.text}>SkillSwap</h2>
    </div>
    </Link>
  )
}
