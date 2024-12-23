import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getVideos } from '../services/videoService'
import { Video } from '../types'
import VideoCard from '../components/video/VideoCard'

export default function SearchResultsPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const location = useLocation()
  const searchQuery = new URLSearchParams(location.search).get('q') || ''

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos()
        const filteredVideos = response.data.filter(video =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setVideos(filteredVideos)
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }
    fetchVideos()
  }, [searchQuery])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  )
}

