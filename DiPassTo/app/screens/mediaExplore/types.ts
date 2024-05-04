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
      'https://videos.pexels.com/video-files/6010489/6010489-uhd_2160_3840_25fps.mp4',
    viewCount: 100,
    thumbnailUrl: 'https://via.placeholder.com/150',
    title: 'The Growing Popularity of sea',
    content: 'The Shocking Truth About sea',
    userAvatar:
      'data:image/png;base64,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',
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
    title: 'The Weird Story Behind walk in sea',
    content: "Here's What You Don't Know About walk in sea",
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
    title: 'When Did deep in forest Get So Famous?',
    content: 'Mythbusting deep in forest',
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
      'https://videos.pexels.com/video-files/3571264/3571264-uhd_3840_2160_30fps.mp4',
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
