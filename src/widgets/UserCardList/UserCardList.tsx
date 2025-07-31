import type { UserCardListProps } from './UserCardList.types'
import { MainButton } from '@uiComponents/MainButton'
import { UserCard } from '@widgetComponents/UserCard'
import React, { useState } from 'react'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

export const UserCardList: React.FC<UserCardListProps> = ({
  type,
  title,
  counter,
  users,
  className,
  buttonText,
  buttonIconId,
  onButtonClick,
  onCardClick,
  onLike,
}) => {
  const [activeIndex, setActiveIndex] = useState(0)
  if (!users.length) {
    return null
  }
  const cards = (
    <ul className={styles.grid} role="list">
      {users.map(user => (
        <li key={user.id} className={styles.gridItem}>
          <UserCard
            User={user}
            onClick={() => onCardClick?.(user.id)}
            onLike={onLike}
          />
        </li>
      ))}
    </ul>
  )
  const button = (
    <MainButton
      type="tertiary"
      aria-label={buttonText}
      onClick={onButtonClick}
      {...(type === 'sorted'
        ? { leftIconId: buttonIconId }
        : { rightIconId: buttonIconId })}
    >
      {buttonText}
    </MainButton>
  )
  return (
    <>
      {type === 'regular' && (
        <section className={`${styles.userCardList} ${className}`} aria-label={title}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {buttonText && button}
          </header>
          {cards}
        </section>
      )}

      {type === 'sorted' && (
        <section className={`${styles.userCardList} ${className}`} aria-label={title}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              {' '}
              {`${title}: ${counter}`}
              {' '}
            </h1>
            {button}
          </header>
          {cards}
        </section>
      )}
      {type === 'slider' && (
        <section className={`${styles.userCardListSlider} ${className}`} aria-label={title}>
          <h2 className={styles.title}>{title}</h2>
          <Swiper
            className={styles.swiper}
            role="region"
            aria-label="Слайдер изображений"
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={4}
            navigation={{
              nextEl: `.${styles['swiper__button-next']}`,
              prevEl: `.${styles['swiper__button-prev']}`,
            }}
            pagination={{ clickable: true }}
            onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          >
            {users.map((user, index) => (
              <SwiperSlide key={index}>
                <UserCard
                  User={user}
                  onClick={() => onCardClick?.(user.id)}
                  onLike={onLike}
                  aria-label={`Профиль ${index + 1} из ${users.length}`}
                />
              </SwiperSlide>
            ))}
            <nav>
              <button className={`${styles.swiper__button} ${styles['swiper__button-prev']}`}></button>
              <button className={`${styles.swiper__button} ${styles['swiper__button-next']}`}></button>
            </nav>
          </Swiper>
          <div
            aria-live="polite"
            style={{
              position: 'absolute',
              width: '1px',
              height: '1px',
              overflow: 'hidden',
              clip: 'rect(1px, 1px, 1px, 1px)',
              whiteSpace: 'nowrap',
            }}
          >
            Слайд
            {' '}
            {activeIndex + 1}
            {' '}
            из
            {users.length}
          </div>
        </section>
      )}
    </>
  )
}
