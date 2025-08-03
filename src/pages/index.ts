import { lazy } from 'react'

export const Pages = {
  Catalog: lazy(() => import('./CatalogPage').then(module => ({
    default: module.CatalogPage,
  }))),
  Favorites: lazy(() => import('./FavoritesPage').then(module => ({
    default: module.FavoritesPage,
  }))),
  Login: lazy(() => import('./LoginPage').then(module => ({
    default: module.LoginPage,
  }))),
  Onboarding: lazy(() => import('./OnboardingPage').then(module => ({
    default: module.OnboardingPage,
  }))),
  Profile: lazy(() => import('./ProfilePage').then(module => ({
    default: module.ProfilePage,
  }))),
  Skill: lazy(() => import('./SkillPage').then(module => ({
    default: module.SkillPage,
  }))),
  NotFound: lazy(() => import('./NotFoundPage').then(module => ({
    default: module.NotFoundPage,
  }))),
}
