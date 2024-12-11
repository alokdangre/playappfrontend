// src/components/VideoPlayer.js
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";
import { fetchVideos } from "../services/api";

// eslint-disable-next-line react/prop-types
const VideoPlayer = ({ token }) => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      const videoData = await fetchVideos(videoId);
      setVideo(videoData);
    };
    loadVideo();
  }, [videoId]);

  if (!video) return <div>Loading...</div>;

  return (
    <div>
      <div className="video-container">
        <video controls>
          <source src={video.videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <LikeButton videoId={videoId} token={token} />
        <CommentSection videoId={videoId} token={token} />
      </div>
    </div>
  );
};

export default VideoPlayer;
