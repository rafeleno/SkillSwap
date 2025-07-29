import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Pages } from '../pages'

import { ProtectedRoute } from '../shared/lib/components/ProtectedRoute'

export function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Pages.Catalog />} />
        <Route path="/skill/:id" element={<Pages.Skill />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/create" element={<Pages.Onboarding />} />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute>
              <Pages.Profile />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/favorites"
          element={(
            <ProtectedRoute>
              <Pages.Favorites />
            </ProtectedRoute>
          )}
        />

        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
    </Suspense>
  )
}
