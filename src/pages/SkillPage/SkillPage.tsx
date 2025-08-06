import type { SkillPageProps } from './SkillPage.types'
import { SkillCard } from '@widgetComponents/SkillCard'
import { UserCard } from '@widgetComponents/UserCard'
import { UserCardList } from '@widgetComponents/UserCardList'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getAllSwaps, selectSwapById } from '../../services/slices/swaps/swapsSlice'
import styles from './styles.module.scss'

export const SkillPage: React.FC<SkillPageProps> = () => {
  const { id } = useParams<{ id: string }>()
  const allSwaps = useSelector(getAllSwaps)
  const currentSwap = useSelector(selectSwapById(id))

  return (
    <div className={styles.container}>
      {currentSwap
        ? (
            <div className={styles.wrapper}>
              <UserCard type="detailed" user={currentSwap} />
              <SkillCard type="view" title={currentSwap.skillCanTeach.name} category={currentSwap.skillCanTeach.subcategoryId} description={currentSwap.skillCanTeach.description} photos={currentSwap.images} />
            </div>
          )
        : (
            <h1>Загрузка информации о пользователе ...</h1>
          )}

      <UserCardList type="slider" users={allSwaps} title="Похожие предложения" />
    </div>

  )
}
