import type { SkillCardProps } from './SkillCard.types'
import { IconButton } from '@uiComponents/IconButton'
import { MainButton } from '@uiComponents/MainButton'
import { NotificationContent } from '@uiComponents/NotificationContent'
import { Modal } from '@widgetComponents/Modal'
import React, { useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'

export const SkillCard: React.FC<SkillCardProps> = ({ type, title, category, description, photos }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles['skill-card']}>
        {type === 'edit' && (
          <>
            <h2 className={styles['skill-card__title']}>Ваше предложение</h2>
            <p className={styles['skill-card__attention']}>Пожалуйста, проверьте и подтвердите правильность данных</p>
          </>
        )}
        {type === 'view' && (
          <div className={styles['skill-card__options']}>
            <IconButton onClick={() => {}} name="like"></IconButton>
            <IconButton onClick={() => {}} name="share"></IconButton>
            <IconButton onClick={() => {}} name="more-square"></IconButton>
          </div>
        )}
        <div className={styles['skill-card__content']}>
          <div className={styles['skill-card__text-content']}>
            <div className={styles['skill-card__text-content__text-wrapper']}>
              <h1 className={styles['skill-card__skill-title']}>{title}</h1>
              <p className={styles['skill-card__category-title']}>{category}</p>
              <p className={styles['skill-card__description']}>
                {description}
              </p>
            </div>
            {type === 'edit' && (
              <div className={styles['skill-card__text-content__button-wrapper']}>
                <MainButton type="secondary" onClick={() => {}} rightIconId="edit"><p>Редактировать</p></MainButton>
                <MainButton type="primary" onClick={() => {}}><p>Готово</p></MainButton>
              </div>
            )}
            {type === 'view' && (
              <div className={styles['skill-card__text-content__button-wrapper']}>
                <MainButton type="primary" onClick={() => { setIsOpen(true) }}><p>Предложить обмен</p></MainButton>
              </div>
            )}
          </div>
          <Swiper
            className={styles['skill-card__swiper']}
            role="region"
            aria-label="Слайдер изображений"
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              nextEl: `.${styles['skill-card__swiper__button-next']}`,
              prevEl: `.${styles['skill-card__swiper__button-prev']}`,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
          >
            {photos.map((photo, index) => (
              <SwiperSlide key={index}>
                <img
                  className={styles['skill-card__swiper__image']}
                  src={photo}
                  role="img"
                  aria-label={`Изображение ${index + 1} из ${photos.length}`}
                />
              </SwiperSlide>
            ))}
            <nav>
              <button className={`${styles['skill-card__swiper__button']} ${styles['skill-card__swiper__button-prev']}`}></button>
              <button className={`${styles['skill-card__swiper__button']} ${styles['skill-card__swiper__button-next']}`}></button>
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
            {photos.length}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div style={{ width: 436 }}>
            <NotificationContent
              title="Важе предложение создано"
              description="Теперь вы можете предложить обмен"
              isOneButton={true}
              onClose={() => setIsOpen(false)}
              iconId="user-circle"
            />
          </div>
        </Modal>
      )}
    </>
  )
}
