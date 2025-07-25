import type { SkillCardProps } from './SkillCard.types'
import { IconButton } from '@uiComponents/IconButton'
import { MainButton } from '@uiComponents/MainButton'
import React from 'react'
import styles from './styles.module.scss'

export const SkillCard: React.FC<SkillCardProps> = ({ type }) => {
  return (
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
            <h1 className={styles['skill-card__skill-title']}>Игра на барабанах</h1>
            <p className={styles['skill-card__category-title']}>Творчество и искусство / Музыка и звук</p>
            <p className={styles['skill-card__description']}>
              Привет! Я играю на барабанах уже больше 10 лет —
              от репетиций в гараже до выступлений на сцене с живыми
              группами. Научу основам техники (и как не отбить себе пальцы),
              играть любимые ритмы и разбирать песни, импровизировать
              и звучать уверенно даже без партитуры
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
              <MainButton type="primary" onClick={() => {}}><p>Предложить обмен</p></MainButton>
            </div>
          )}
        </div>
        <div className={styles['skill-card__image-content']}>

        </div>
      </div>
    </div>
  )
}
