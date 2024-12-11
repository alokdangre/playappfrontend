import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer "
  },
});

export const fetchVideos = async () => {
  const response = await api.get("/videos");
  return response.data;
};

export const fetchComments = async (videoId) => {
  const response = await api.get(`/comments/${videoId}`);
  return response.data;
};

export const addComment = async (content, videoId, token) => {
  const response = await api.post(`/comments/${videoId}`, { content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const toggleLike = async (videoId, token) => {
  const response = await api.post(`/likes/toggle/v/${videoId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const fetchUserProfile = async (token) => {
  const response = await api.get("/users/current-user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
