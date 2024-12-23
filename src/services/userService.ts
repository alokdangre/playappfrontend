import api from './api';
import { User } from '../types';

export const getCurrentUser = () => api.get<User>('/users/current-user');
export const getUserProfile = (username: string) => api.get<User>(`/users/c/${username}`);
export const updateUserDetails = (data: Partial<User>) => api.patch<User>('/users/update-account', data);
export const updateUserAvatar = (formData: FormData) => api.patch<User>('/users/avatar', formData);
export const updateUserCoverImage = (formData: FormData) => api.patch<User>('/users/cover-image', formData);
// export const getWatchHistory = () => api.get<Video[]>('/users/history');

