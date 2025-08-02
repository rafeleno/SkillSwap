import { MainPage } from '@pageComponents/MainPage'
import { Header } from '@widgetComponents/Header'
import React from 'react'

export function App() {
  return (
    <>
      {/* передать из слайса */}
      <Header user={null}></Header>
      <main className="skill-swap-main">
        <MainPage></MainPage>
      </main>
      <footer></footer>
    </>
  )
}
