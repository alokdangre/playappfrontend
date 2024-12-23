export interface User {
    _id: string;
    username: string;
    email: string;
    fullname: string;
    avatar: string;
    coverImage: string;
    watchHistory: string[];
  }
  
  export interface Video {
    _id: string;
    title: string;
    description: string;
    videoFile: string;
    thumbnail: string;
    duration: number;
    views: number;
    isPublished: boolean;
    owner: User;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Comment {
    _id: string;
    content: string;
    video: string;
    owner: User;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Like {
    _id: string;
    video?: string;
    comment?: string;
    likedBy: User;
    createdAt: string;
    updatedAt: string;
  }
  
  