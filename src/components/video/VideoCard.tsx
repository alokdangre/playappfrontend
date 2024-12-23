import { Link } from 'react-router-dom'
import { Video } from '../../types'

interface VideoCardProps {
  video: Video
  layout?: 'grid' | 'list'
}

export default function VideoCard({ video, layout = 'grid' }: VideoCardProps) {
  return (
    <Link to={`/video/${video._id}`} className={`bg-secondary rounded-lg overflow-hidden ${layout === 'list' ? 'flex' : ''}`}>
      <img src={video.thumbnail} alt={video.title} className={`w-full ${layout === 'list' ? 'w-48 h-28 object-cover' : 'h-48 object-cover'}`} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2">{video.title}</h3>
        <p className="text-sm text-gray-400">{video.views} views • {new Date(video.createdAt).toLocaleDateString()}</p>
        <div className="flex items-center mt-2">
          <img src={video.owner.avatar} alt={video.owner.username} className="w-6 h-6 rounded-full mr-2" />
          <span className="text-sm text-gray-400">{video.owner.username}</span>
        </div>
      </div>
    </Link>
  )
}

