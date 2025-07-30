import React, { useState } from 'react'
import { LikeButton } from '../shared/ui/LikeButton'

export function App() {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => setLiked(prev => !prev)

  return (
    <div style={{ padding: '40px' }}>
      <LikeButton isActive={liked} onClick={toggleLike} />
    </div>
  )
}
