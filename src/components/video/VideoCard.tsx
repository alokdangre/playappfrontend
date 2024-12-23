import { Link } from 'react-router-dom'
import { Video } from '../../types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { formatDistanceToNow } from 'date-fns'

interface VideoCardProps {
  video: Video
  layout?: 'grid' | 'list'
}

export const VideoCard = ({ video, layout = 'grid' }: VideoCardProps) => {
  return (
    <Card className={`overflow-hidden border-0 bg-background ${layout === 'list' ? 'flex' : ''}`}>
      <Link to={`/video/${video._id}`} className="relative block">
        <div className={`group relative ${layout === 'list' ? 'w-[360px]' : 'w-full'}`}>
          <img 
            src={video.thumbnail} 
            alt={video.title} 
            className={`aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105`}
          />
          <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-xs text-white">
            {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
          </div>
        </div>
      </Link>
      <CardContent className={`p-3 ${layout === 'list' ? 'flex-1' : ''}`}>
        <div className="flex gap-3">
          <Link to={`/user/${video.owner.username}`} className="flex-shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src={video.owner.avatar} alt={video.owner.username} />
              <AvatarFallback>{video.owner.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex-1 space-y-1">
            <Link to={`/video/${video._id}`}>
              <h3 className="line-clamp-2 font-semibold leading-tight hover:text-primary">
                {video.title}
              </h3>
            </Link>
            <Link to={`/user/${video.owner.username}`} className="block">
              <p className="line-clamp-1 text-sm text-muted-foreground hover:text-primary">
                {video.owner.username}
              </p>
            </Link>
            <p className="text-xs text-muted-foreground">
              {video.views.toLocaleString()} views • {formatDistanceToNow(new Date(video.createdAt))} ago
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VideoCard

