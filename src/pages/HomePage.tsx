import VideoGrid from '../components/video/VideoGrid'

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to VidShare</h1>
      <VideoGrid />
    </div>
  )
}
