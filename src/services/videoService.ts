import api from './api';
import { Video } from '../types';

export const getVideos = () => api.get<Video[]>('/videos');
export const getVideo = (id: string) => api.get<Video>(`/videos/${id}`);
export const uploadVideo = (formData: FormData) => api.post<Video>('/videos', formData);
export const updateVideo = (id: string, data: Partial<Video>) => api.patch<Video>(`/videos/${id}`, data);
export const deleteVideo = (id: string) => api.delete(`/videos/${id}`);
export const getVideoComments = (id: string) => api.get(`/videos/${id}/comments`);

