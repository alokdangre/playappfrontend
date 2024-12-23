import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserProfile } from '../services/userService'
import { getVideos } from '../services/videoService'
import { User, Video } from '../types'
import VideoCard from '../components/video/VideoCard'

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchUserAndVideos = async () => {
      try {
        const userResponse = await getUserProfile(username!)
        setUser(userResponse.data)

        const videosResponse = await getVideos()
        setVideos(videosResponse.data.filter(video => video.owner.username === username))
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }
    fetchUserAndVideos()
  }, [username])

  if (!user) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4">
        <img src={user.coverImage} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 flex items-center">
          <img src={user.avatar} alt={user.username} className="w-16 h-16 rounded-full border-4 border-white" />
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-white">{user.fullname}</h1>
            <p className="text-white">@{user.username}</p>
          </div>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  )
}

