import React, { useState } from 'react'
import userAvatar from '../../assets/images/avatars/user1.jpg'
import chevronDown from '../../assets/svg/main/chevron-down.svg'
import { IconButton } from '../../shared/ui/IconButton'
import { MainButton } from '../../shared/ui/MainButton'
import { MainLogo } from '../../shared/ui/MainLogo'
import { NotificationBell } from '../../shared/ui/NotificationBell'
import { Search } from '../../shared/ui/Search'
import styles from './styles.module.scss'

interface HeaderProps {
  user: null | {
    name: string
    avatar: string
  }
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className={styles.header}>
      <MainLogo />

      <nav className={styles.nav}>
        <button className={styles.link}>О проекте</button>
        <button className={styles.dropdown}>
          Все навыки
          <img src={chevronDown} alt="Открыть список" className={styles['dropdown-icon']} />
        </button>
      </nav>

      <Search
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        onClear={() => setSearchValue('')}
        placeholder="Искать навык"
      />

      <div className={styles['icons-and-user']}>
        <IconButton name="moon" onClick={() => {}} />

        {user
          ? (
              <>
                <NotificationBell isActive={false} onClick={() => {}} />
                <IconButton name="like" onClick={() => {}} />

                <div className={styles['user-info']}>
                  <span className={styles['user-name']}>{user.name}</span>
                  <img src={userAvatar} alt="Аватар пользователя" className={styles['user-avatar']} />
                </div>
              </>
            )
          : (
              <div className={styles['auth-buttons']}>
                <MainButton type="secondary" onClick={() => {}}>
                  Войти
                </MainButton>
                <MainButton type="primary" onClick={() => {}}>
                  Зарегистрироваться
                </MainButton>
              </div>
            )}
      </div>
    </header>
  )
}
