import { useState, useEffect } from 'react'
import { ThumbUpIcon } from '@heroicons/react/solid'
import { toggleVideoLike } from '../../services/likeService'

interface LikeButtonProps {
  videoId: string
}

export default function LikeButton({ videoId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    // Fetch initial like status and count
    // This is a placeholder. You should implement this based on your API
  }, [videoId])

  const handleLike = async () => {
    try {
      await toggleVideoLike(videoId)
      setLikes(isLiked ? likes - 1 : likes + 1)
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('Error liking video:', error)
    }
  }

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-1 ml-4 ${isLiked ? 'text-accent' : 'text-gray-400'}`}
    >
      <ThumbUpIcon className="h-5 w-5" />
      <span>{likes}</span>
    </button>
  )
}

