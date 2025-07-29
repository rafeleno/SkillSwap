import { MainLogo } from '@uiComponents/MainLogo'
import styles from './styles.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer} aria-label="Футер сайта SkillSwap">
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <MainLogo aria-label="Логотип SkillSwap" />
          <span className={styles.copyright} aria-label="Авторские права">
            SkillSwap — 2025
          </span>
        </div>

        <nav className={styles.menu} aria-label="Навигационное меню">
          <ul className={styles.menuList} aria-label="Основные ссылки">
            <li>
              <a href="#" className={styles.link} aria-label="Узнать о проекте">
                О проекте
              </a>
            </li>
            <li>
              <a href="#" className={styles.link} aria-label="Посмотреть все навыки">
                Все навыки
              </a>
            </li>
          </ul>

          <ul className={styles.menuList} aria-label="Контактные ссылки">
            <li>
              <a href="#" className={styles.link} aria-label="Связаться с нами">
                Контакты
              </a>
            </li>
            <li>
              <a href="#" className={styles.link} aria-label="Читать блог">
                Блог
              </a>
            </li>
          </ul>

          <ul className={styles.menuList} aria-label="Правовые ссылки">
            <li>
              <a href="#" className={styles.link} aria-label="Читать политику конфиденциальности">
                Политика конфиденциальности
              </a>
            </li>
            <li>
              <a href="#" className={styles.link} aria-label="Читать пользовательское соглашение">
                Пользовательское соглашение
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
