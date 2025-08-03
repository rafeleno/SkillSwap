import { MainPage } from '@pageComponents/MainPage'
import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React from 'react'

export function App() {
  return (
    // <div className={styles.container}>
    <>
      {/* передать из слайса */}
      <Header user={null}></Header>
      <main className="skill-swap-main">
        <MainPage></MainPage>
      </main>
      <Footer></Footer>
    </>
  )
}
