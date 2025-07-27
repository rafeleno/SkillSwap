import type { FooterProps } from './Footer.types'
import { MainLogo } from '@uiComponents/MainLogo'
import React from 'react'
import styles from './styles.module.scss'

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <MainLogo />
          <span className={styles.copyright}>
            SkillSwap — 2025
          </span>
        </div>

        <nav className={styles.menu}>
          <ul className={styles.menuList}>
            <li>
              <a href="#" className={styles.link}>
                О проекте
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Все навыки
              </a>
            </li>
          </ul>

          <ul className={styles.menuList}>
            <li>
              <a href="#" className={styles.link}>
                Контакты
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Блог
              </a>
            </li>
          </ul>

          <ul className={styles.menuList}>
            <li>
              <a href="#" className={styles.link}>
                Политика конфиденциальности
              </a>
            </li>
            <li>
              <a href="#" className={styles.link}>
                Пользовательское соглашение
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
