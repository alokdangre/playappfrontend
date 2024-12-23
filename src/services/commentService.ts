import api from './api';
import { Comment } from '../types';

export const addComment = (videoId: string, content: string) => api.post<Comment>(`/comments/${videoId}`, { content });
export const updateComment = (commentId: string, content: string) => api.patch<Comment>(`/comments/c/${commentId}`, { content });
export const deleteComment = (commentId: string) => api.delete(`/comments/c/${commentId}`);

