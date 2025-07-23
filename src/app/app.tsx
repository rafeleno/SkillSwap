import React from 'react'
import { LikeButton } from '../shared/ui/LikeButton'

export function App() {
  return <LikeButton isActive={true} onClick={() => console.log('clicked')} />
}