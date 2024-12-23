// import { useParams } from 'react-router-dom'
import VideoPlayer from '../components/video/VideoPlayer'

export default function VideoPage() {
//   const { id } = useParams<{ id: string }>()

  return (
    <div className="container mx-auto p-4">
      <VideoPlayer />
    </div>
  )
}

