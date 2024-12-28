import { useState, useEffect } from 'react'
import { getVideos } from '../../services/videoService'
import { Video } from '../../types'
import VideoCard from './VideoCard'
import { Button } from '@/components/ui/button'
import { Grid2X2, List } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export const VideoGrid = () => {
  const [videos, setVideos] = useState<Video[]>([])
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await getVideos()
        setVideos(response.data)
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchVideos()
  }, [])

  return (
    <div className="container space-y-4 py-4 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Trending Videos</h2>
        <div className="flex items-center gap-2">
          <Button
            variant={layout === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setLayout('grid')}
          >
            <Grid2X2 className="h-5 w-5" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant={layout === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setLayout('list')}
          >
            <List className="h-5 w-5" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div
          className={`grid gap-4 ${
            layout === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'space-y-4'
          }`}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`space-y-3 ${
                layout === 'list' ? 'flex gap-4 items-center' : ''
              }`}
            >
              <Skeleton
                className={`aspect-video ${
                  layout === 'list' ? 'h-[202px] w-[360px]' : 'w-full'
                }`}
              />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-4 ${
            layout === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'space-y-4'
          }`}
        >
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} layout={layout} />
          ))}
        </div>
      )}
    </div>
  )
}

export default VideoGrid
