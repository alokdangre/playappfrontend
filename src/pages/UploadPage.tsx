import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadVideo } from '../services/videoService';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || !thumbnail) {
      alert('Please upload both a video and a thumbnail!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);

    try {
      const response = await uploadVideo(formData);
      navigate(`/video/${response.data._id}`);
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Failed to upload the video. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Upload Your Video</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md space-y-6"
      >
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter the video title"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Write a brief description"
            rows={4}
            required
          />
        </div>

        {/* Video File Input */}
        <div>
          <label htmlFor="videoFile" className="block text-sm font-medium mb-2">
            Video File
          </label>
          <input
            type="file"
            id="videoFile"
            onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
            accept="video/*"
            required
          />
        </div>

        {/* Thumbnail Input */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium mb-2">
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none"
            accept="image/*"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent-dark transition-colors"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
}
