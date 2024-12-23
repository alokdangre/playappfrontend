import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getVideo } from '../../services/videoService'
import { Video } from '../../types'
import LikeButton from './LikeButton'
import CommentList from '../comment/CommentList'
import CommentForm from '../comment/CommentForm'

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>()
  const [video, setVideo] = useState<Video | null>(null)
  const [isFocusMode, setIsFocusMode] = useState(false)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await getVideo(id!)
        setVideo(response.data)
      } catch (error) {
        console.error('Error fetching video:', error)
      }
    }
    fetchVideo()
  }, [id])

  if (!video) return <div>Loading...</div>

  return (
    <div className={`container mx-auto p-4 ${isFocusMode ? 'bg-black' : ''}`}>
      <div className={`${isFocusMode ? 'max-w-4xl mx-auto' : ''}`}>
        <div className="relative pt-[56.25%]">
          <iframe
            src={video.videoFile}
            className="absolute top-0 left-0 w-full h-full"
            allowFullScreen
          ></iframe>
        </div>
        <div className={`mt-4 ${isFocusMode ? 'text-white' : ''}`}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{video.title}</h1>
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="px-4 py-2 bg-accent text-white rounded hover:bg-opacity-80"
            >
              {isFocusMode ? 'Exit Focus Mode' : 'Focus Mode'}
            </button>
          </div>
          <div className="flex items-center mt-2">
            <img src={video.owner.avatar} alt={video.owner.username} className="w-10 h-10 rounded-full mr-2" />
            <span>{video.owner.username}</span>
          </div>
          <div className="flex items-center mt-2">
            <span>{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</span>
            <LikeButton videoId={video._id} />
          </div>
          <p className="mt-4">{video.description}</p>
        </div>
        <CommentList videoId={video._id} />
        <CommentForm videoId={video._id} />
      </div>
    </div>
  )
}

