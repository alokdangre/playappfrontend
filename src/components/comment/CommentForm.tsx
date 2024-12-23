import { useState } from 'react'
import { addComment } from '../../services/commentService'

interface CommentFormProps {
  videoId: string
}

export default function CommentForm({ videoId }: CommentFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addComment(videoId, content)
      setContent('')
      // You might want to refresh the comment list here
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 rounded-lg bg-secondary text-white"
        placeholder="Add a comment..."
        rows={3}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-80"
      >
        Post Comment
      </button>
    </form>
  )
}

