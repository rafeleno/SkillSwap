import type { SkillCardProps } from './SkillCard.types'
import React from 'react'
import styles from './styles.module.scss'

export const SkillCard: React.FC<SkillCardProps> = () => {
  return (
    <div className={styles['skill-card']}>
      <div className={styles['skill-card__options']}>
        <button className={styles['skill-card__button']}>Option 1</button>
        <button className={styles['skill-card__button']}>Option 2</button>
        <button className={styles['skill-card__button']}>Option 2</button>
      </div>
      <div className={styles['skill-card__divider']}>
        <div className={styles['skill-card__content']}>
          <div className={styles['skill-card__text-content']}>
            <h1 className={styles['skill-card__title']}>Игра на барабанах</h1>
            <p className={styles['skill-card__category-title']}>Творчество и искусство / Музыка и звук</p>
            <p className={styles['skill-card__description']}>Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры</p>
          </div>
          <div className={styles['skill-card__image-content']}>
            <div className={styles['test-image']}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
