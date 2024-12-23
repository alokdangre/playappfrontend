import api from './api';

export const toggleVideoLike = (videoId: string) => api.post(`/likes/toggle/v/${videoId}`);
export const toggleCommentLike = (commentId: string) => api.post(`/likes/toggle/c/${commentId}`);
export const getLikedVideos = () => api.get('/likes/videos');

