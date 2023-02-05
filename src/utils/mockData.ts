import { Video } from '../types/video';

export const mockAuthToken = { token: '1' };
export const mockAuthUser = { id: '1', image: null, subscriptions: ['1', '2'] };
export const mockUser = {
  _id: '1',
  name: 'John Smith',
  bio: 'bio',
  subscribers: 3,
  subscriptions: ['1', '2', '3'],
  image: 'https://via.placeholder.com/150',
};

export const mockComment = {
  _id: '1',
  userId: '1',
  videoId: '1',
  description: 'first comment',
  likes: ['1', '2'],
  createdAt: new Date('05 October 2011 14:48 UTC'),
  updatedAt: new Date('05 October 2011 14:48 UTC'),
};

export const mockVideo: Video = {
  userId: '1',
  _id: '1',
  description: 'desc',
  title: 'title',
  duration: 5,
  imageUrl: '',
  videoUrl: '',
  views: 10,
  createdAt: new Date('05 October 2011 14:48 UTC'),
  updatedAt: new Date('05 October 2011 14:48 UTC'),
  likes: ['1'],
  tags: ['a'],
};

export const mockVideos: Video[] = [mockVideo, mockVideo, mockVideo];

export const mockComments = [mockComment, mockComment, mockComment];
