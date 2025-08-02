import { MainPage } from '@pageComponents/MainPage'
import { Header } from '@widgetComponents/Header'
import React from 'react'
import styles from './styles.module.scss'

export function App() {
  return (
    <div className={styles.container}>
      {/* передать из слайса */}
      <Header user={null}></Header>
      <main className="skill-swap-main">
        <MainPage></MainPage>
      </main>
      <footer></footer>
    </div>
  )
}
