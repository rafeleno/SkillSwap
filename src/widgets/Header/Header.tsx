import type { TUser } from '@widgetComponents/UserCard/UserCard.types'
import { IconButton } from '@uiComponents/IconButton'
import { MainButton } from '@uiComponents/MainButton'
import { MainLogo } from '@uiComponents/MainLogo'
import { Search } from '@uiComponents/Search'
import { SkillsPopup } from '@widgetComponents/SkillsPopup'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAssetPath } from '../../shared/utils/getAssetPath'
import { NotificationDropdown } from '../NotificationDropdown'
import styles from './styles.module.scss'

interface HeaderProps {
  user: null | TUser
}

export function removeLastEl(value: string): string {
  if (value.includes('.jpg'))
    return value
  return value.slice(0, -1)
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const { avatar, name } = user || {}
  const [searchValue, setSearchValue] = useState('')
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [isSkillsPopupOpen, setIsSkillsPopupOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const toggleNotification = () => {
    setIsNotificationOpen(prev => !prev)
  }

  const closeNotification = () => {
    setIsNotificationOpen(false)
  }

  const openSkillsPopup = () => {
    setIsSkillsPopupOpen(true)
  }

  const closeSkillsPopup = () => {
    setIsSkillsPopupOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles['header-content']}>
        <MainLogo />

        <nav className={styles.nav}>
          <button className={styles.link}>О проекте</button>
          <button
            className={styles.dropdown}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation()
              openSkillsPopup()
            }}
          >
            Все навыки
            <svg
              className={`${styles.dropdownIcon} ${isSkillsPopupOpen && styles.dropdownIconOpen}`}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <use href="#icon-chevron-down" />
            </svg>
            {isSkillsPopupOpen
              && (
                <SkillsPopup
                  onClose={closeSkillsPopup}
                />
              )}
          </button>
        </nav>

        <Search
          user={user}
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
                  <NotificationDropdown
                    isOpen={isNotificationOpen}
                    onClose={closeNotification}
                    onClick={toggleNotification}
                  />
                  <IconButton name="like" onClick={() => {}} />

                  <Link to={`/profile/${user.id}/data`}>
                    <div className={styles['user-info']}>
                      <span className={styles['user-name']}>{name}</span>
                      {avatar && (
                        <img src={getAssetPath(removeLastEl(avatar))} alt="Аватар пользователя" className={styles['user-avatar']} />
                      )}
                      {!avatar && (
                        <svg
                          className={styles['user-avatar']}
                          width="54"
                          height="54"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <use href="#icon-user-circle" />
                        </svg>
                      )}
                    </div>
                  </Link>
                </>
              )
            : (
                <div className={styles['auth-buttons']}>
                  <MainButton type="secondary" onClick={() => navigate('/login')}>
                    Войти
                  </MainButton>
                  <MainButton type="primary" onClick={() => navigate('/register')}>
                    Зарегистрироваться
                  </MainButton>
                </div>
              )}
        </div>

      </div>
    </header>
  )
}
