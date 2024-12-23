import { useState, useEffect } from 'react'
import { getVideoComments } from '../../services/videoService'
import { Comment } from '../../types'

interface CommentListProps {
  videoId: string
}

export default function CommentList({ videoId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getVideoComments(videoId)
        setComments(response.data)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    fetchComments()
  }, [videoId])

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-secondary rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <img src={comment.owner.avatar} alt={comment.owner.username} className="w-8 h-8 rounded-full mr-2" />
            <span className="font-semibold">{comment.owner.username}</span>
            <span className="text-gray-400 text-sm ml-2">{new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  )
}

