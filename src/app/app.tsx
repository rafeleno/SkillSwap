import { MainPage } from '@pageComponents/MainPage'
import React from 'react'

export function App() {
  return (
    <>
      {/* передать из слайса */}
      <header user={null}></header>
      <main className="skill-swap-main">
        <MainPage></MainPage>
      </main>
      <footer></footer>
    </>
  )
}
