import { Footer } from '@widgetComponents/Footer'
import { Header } from '@widgetComponents/Header'
import React, { Suspense } from 'react'

import { Outlet, Route, Routes } from 'react-router-dom'
import { Pages } from '../pages'
import { ProtectedRoute } from '../shared/lib/components/ProtectedRoute'

export function DefaultLayout() {
  return (
    <>
      {/* TODO: вытяннуть из слайса */}
      <Header user={null} />
      <Outlet />
      <Footer />
    </>
  )
}

// routes/CustomLayout.tsx
export function CustomLayout() {
  return (
    <>
      <Outlet />
    </>
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
          <Route path="/skill/:id" element={<Pages.Skill />} />
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
