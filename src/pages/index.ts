import { lazy } from 'react'

export const Pages = {
  NotFound404: lazy(() => import('./NotFound404').then(module => ({
    default: module.NotFound404,
  }))),
  NotFound500: lazy(() => import('./NotFound500').then(module => ({
    default: module.NotFound500,
  }))),
  Catalog: lazy(() => import('./MainPage').then(module => ({
    default: module.MainPage,
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
  Register: lazy(() => import('./RegisterPage').then(module => ({
    default: module.Register,
  }))),
}
