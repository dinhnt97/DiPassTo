export type ReactionType = 'LIKE' | 'LOVE' | 'UNLIKE';
export interface PostInfoType {
  id: string;
  videoUrl: string;
  viewCount: number;
  thumbnailUrl: string | null;
  title: string;
  content: string;
  userAvatar: string | null;
  userId: string | null;
  userName: string | null;
  shareCount: number;
  commentCount: number;
  videoDisplayRate: number;
  createdAt: string;
  reactionCount: number;
}

export const postList: PostInfoType[] = [
  {
    id: '1',
    videoUrl:
      'https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4',
    viewCount: 100,
    thumbnailUrl: 'https://via.placeholder.com/150',
    title: 'Post 1',
    content: 'Content 1',
    userAvatar: 'https://via.placeholder.com/150',
    userId: '1',
    userName: 'User 1',
    shareCount: 10,
    commentCount: 5,
    videoDisplayRate: 1.8,
    createdAt: '2021-10-10',
    reactionCount: 10,
  },
  {
    id: '2',
    videoUrl:
      'https://videos.pexels.com/video-files/4759582/4759582-hd_1080_1920_30fps.mp4',
    viewCount: 200,
    thumbnailUrl: 'https://via.placeholder.com/150',
    title: 'Post 2',
    content: 'Content 2',
    userAvatar: 'https://via.placeholder.com/150',
    userId: '2',
    userName: 'User 2',
    shareCount: 20,
    commentCount: 10,
    videoDisplayRate: 0.6,
    createdAt: '2021-10-10',
    reactionCount: 20,
  },
  {
    id: '3',
    videoUrl:
      'https://videos.pexels.com/video-files/5896379/5896379-uhd_2160_3840_24fps.mp4',
    viewCount: 300,
    thumbnailUrl: 'https://via.placeholder.com/150',
    title: 'Post 3',
    content: 'Content 3',
    userAvatar: 'https://via.placeholder.com/150',
    userId: '3',
    userName: 'User 3',
    shareCount: 30,
    commentCount: 15,
    videoDisplayRate: 0.6,
    createdAt: '2021-10-10',
    reactionCount: 30,
  },
  {
    id: '4',
    videoUrl:
      'https://videos.pexels.com/video-files/6010489/6010489-uhd_2160_3840_25fps.mp4',
    viewCount: 400,
    thumbnailUrl: 'https://via.placeholder.com/150',
    title: 'Post 4',
    content: 'Content 4',
    userAvatar: 'https://via.placeholder.com/150',
    userId: '4',
    userName: 'User 4',
    shareCount: 40,
    commentCount: 20,
    videoDisplayRate: 0.6,
    createdAt: '2021-10-10',
    reactionCount: 40,
  },
  {
    id: '5',
    videoUrl:
      'https://videos.pexels.com/video-files/4812205/4812205-hd_1080_1920_30fps.mp4',
    viewCount: 500,
    thumbnailUrl: 'https://via.placeholder.com/150',
    title: 'Post 5',
    content: 'Content 5',
    userAvatar: 'https://via.placeholder.com/150',
    userId: '5',
    userName: 'User 5',
    shareCount: 50,
    commentCount: 25,
    videoDisplayRate: 0.6,
    createdAt: '2021-10-10',
    reactionCount: 50,
  },
];
