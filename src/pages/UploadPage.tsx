import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadVideo } from '../services/videoService'

export default function UploadPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!videoFile || !thumbnail) return

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('videoFile', videoFile)
    formData.append('thumbnail', thumbnail)

    try {
      const response = await uploadVideo(formData)
      navigate(`/video/${response.data._id}`)
    } catch (error) {
      console.error('Error uploading video:', error)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg bg-secondary text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg bg-secondary text-white"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="videoFile" className="block mb-2">Video File</label>
          <input
            type="file"
            id="videoFile"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="w-full p-2 rounded-lg bg-secondary text-white"
            accept="video/*"
            required
          />
        </div>
        <div>
          <label htmlFor="thumbnail" className="block mb-2">Thumbnail</label>
          <input
            type="file"
            id="thumbnail"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full p-2 rounded-lg bg-secondary text-white"
            accept="image/*"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-80"
        >
          Upload Video
        </button>
      </form>
    </div>
  )
}

