import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Pages } from '../pages'

export function AppRouter() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Pages.Catalog />} />
        <Route path="/skill/:id" element={<Pages.Skill />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/profile" element={<Pages.Profile />} />
        <Route path="/create" element={<Pages.Onboarding />} />
        <Route path="/favorites" element={<Pages.Favorites />} />
        <Route path="*" element={<Pages.NotFound />} />
      </Routes>
    </Suspense>
  )
}
