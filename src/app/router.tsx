import { MainButton } from '@uiComponents/MainButton'
import { MainLogo } from '@uiComponents/MainLogo'
import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React, { Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { Pages } from '../pages'
import { SkillPage } from '../pages/SkillPage/SkillPage'
import { ProtectedRoute } from '../shared/lib/components/ProtectedRoute'
import styles from './styles.module.scss'

// TODO: Вынести компонент
function HeaderCompact() {
  return (
    <header className={styles.header}>
      <MainLogo />
      <MainButton
        type="tertiary"
        rightIconId="cross"
        onClick={() => {}}
      >
        Закрыть
      </MainButton>
    </header>
  )
}

export function DefaultLayout() {
  return (
    <>
      {/* TODO: вытяннуть из слайса */}
      <Header user={666} />
      <Outlet />
      <Footer />
    </>
  )
}

// routes/CustomLayout.tsx
export function CustomLayout() {
  return (
    <div className={styles.customLayout}>
      <HeaderCompact />
      <Outlet />
    </div>
  )
}

export function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Pages.Catalog />} />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="/skills/:id" element={<SkillPage />} />
        </Route>

        {/* Только для неавторизованных */}
        <Route element={<CustomLayout />}>
          <Route
            path="/login"
            element={(
              <ProtectedRoute onlyUnAuth>
                <Pages.Login />
              </ProtectedRoute>
            )}
          />
        </Route>
        <Route element={<CustomLayout />}>
          <Route
            path="/register"
            element={(
              <ProtectedRoute onlyUnAuth>
                <Pages.Register />
              </ProtectedRoute>
            )}
          />
        </Route>
        {/* <Route
          path="/create"
          element={(
            <ProtectedRoute onlyUnAuth>
              <Pages.Onboarding />
            </ProtectedRoute>
          )}
        /> */}

        {/* Только для авторизованных */}
        <Route element={<DefaultLayout />}>
          <Route
            path="/profile"
            element={(
              <ProtectedRoute>
                <Pages.Profile />
              </ProtectedRoute>
            )}
          />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route
            path="/favorites"
            element={(
              <ProtectedRoute>
                <Pages.Favorites />
              </ProtectedRoute>
            )}
          />
        </Route>
        <Route element={<DefaultLayout />}>
          <Route path="*" element={<Pages.NotFound404 />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
