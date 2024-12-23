import { useState, useEffect } from 'react'
import { getVideos } from '../../services/videoService'
import { Video } from '../../types'
import VideoCard from './VideoCard'

export default function VideoGrid() {
  const [videos, setVideos] = useState<Video[]>([])
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos()
        setVideos(response.data)
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Trending Videos</h2>
        <div className="space-x-2">
          <button
            onClick={() => setLayout('grid')}
            className={`px-3 py-1 rounded ${layout === 'grid' ? 'bg-accent text-white' : 'bg-secondary text-white'}`}
          >
            Grid
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`px-3 py-1 rounded ${layout === 'list' ? 'bg-accent text-white' : 'bg-secondary text-white'}`}
          >
            List
          </button>
        </div>
      </div>
      <div className={`${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-4'}`}>
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} layout={layout} />
        ))}
      </div>
    </div>
  )
}

