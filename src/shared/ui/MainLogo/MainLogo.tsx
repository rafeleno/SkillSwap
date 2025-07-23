import type { MainLogoProps } from './MainLogo.types'
import React from 'react'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

export const MainLogo: React.FC<MainLogoProps> = () => {
  return (
    <Link className={styles.mainLogo} to='/'>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}></span>
      </div>
      <h2>SkillSwap</h2>
    </Link>
  )
}
