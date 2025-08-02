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
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const renderEmptyState = () => (
    <p className={styles.userCardListEmpty} aria-label="Нет пользователей для отображения">
      Нет пользователей для отображения
    </p>
  )

  const renderCards = () =>
    users.length
      ? (
          <ul className={styles.cardGrid} role="list" aria-label="Список пользователей">
            {users.map(user => (
              <li key={user.id} className={styles.cardItem} aria-label={`Карточка пользователя ${user.name}`}>
                <UserCard
                  type="preview"
                  user={user}
                  onClick={onCardClick}
                  onLike={onLike}
                />
              </li>
            ))}
          </ul>
        )
      : renderEmptyState()
  const renderButton = () =>
    buttonText && (
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
  const renderSection = (headerContent: React.ReactNode, bodyContent: React.ReactNode) => (
    <section className={`${styles.userCardList} ${className || ''}`} aria-label={title}>
      <header className={styles.header} aria-label={title}>{headerContent}</header>
      {bodyContent}
    </section>
  )

  return (
    <>
      { (type === 'regular' || type === 'sorted')
        && renderSection(
          <>
            <h1 className={styles.title}>
              {type === 'sorted' && counter ? `${title}: ${counter}` : title}
            </h1>
            {renderButton()}
          </>,
          renderCards(),
        )}
      {type === 'slider' && (
        <section className={`${styles.userCardListSlider} ${className || ''}`} aria-label={title}>
          <h2 className={styles.title}>{title}</h2>
          {!users.length
            ? renderEmptyState()
            : (
                <>
                  <Swiper
                    className={styles.swiper}
                    role="region"
                    aria-label="Слайдер профилей пользователей"
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={4}
                    navigation={{
                      nextEl: `.${styles.swiperButtonNext}`,
                      prevEl: `.${styles.swiperButtonPrev}`,
                    }}
                    pagination={{ clickable: true }}
                    onSlideChange={(swiper) => {
                      setActiveIndex(swiper.activeIndex)
                      setIsBeginning(swiper.isBeginning)
                      setIsEnd(swiper.isEnd)
                    }}
                  >
                    {users.map((user, index) => (
                      <SwiperSlide key={user.id}>
                        <UserCard
                          type="preview"
                          user={user}
                          onClick={onCardClick}
                          onLike={onLike}
                          aria-label={`Профиль ${index + 1} из ${users.length}`}
                        />
                      </SwiperSlide>
                    ))}
                    <nav>
                      <button
                        className={`${styles.swiperButton} ${styles.swiperButtonPrev} ${isBeginning ? styles.swiperButtonHidden : ''}`}
                        aria-label="Предыдущий слайд"
                        aria-disabled={isBeginning}
                      />
                      <button
                        className={`${styles.swiperButton} ${styles.swiperButtonNext} ${isEnd ? styles.swiperButtonHidden : ''}`}
                        aria-label="Следующий слайд"
                        aria-disabled={isEnd}
                      />
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
                    {`Слайды ${activeIndex + 4} из ${users.length}`}
                  </div>
                </>
              )}
        </section>
      )}
    </>
  )
}
