import React from 'react'
import styles from './styles.module.scss'
import { ProfileMenuProps } from './ProfileMenu.types'


export const ProfileMenu: React.FC<ProfileMenuProps> = () => {
  return (
    <div className={styles.profileMenu}>
      <div className={styles.profileMenuItem}>
        <svg width='20' height='17.1'>
          <use href="/sprites.svg#request" />
        </svg>
        Заявки
      </div>
      <div className={styles.profileMenuItem}>
        <svg width='20' height='17.1'>
          <use href="/sprites.svg#message-text" />
        </svg>
        Мои обмены
      </div>
      <div className={styles.profileMenuItem}>
        <svg width='20' height='17.1'>
          <use href="/sprites.svg#like" />
        </svg>
        Избранное
      </div>
      <div className={styles.profileMenuItem}>
        <svg width='20' height='17.1' fill='none'>
          <use href="/sprites.svg#idea" />
        </svg>
        Мои навыки
      </div>
      <div className={styles.profileMenuItem}>
        <svg width='20' height='17.1'>
          <use href="/sprites.svg#user" />
        </svg>
        Личные данные
      </div>
    </div>
  )
}
