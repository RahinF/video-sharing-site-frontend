export const mockAuthToken = { token: '1' };
export const mockAuthUser = { id: '1', image: null, subscriptions: ['1', '2'] };
export const mockUser = {
    _id: '1',
    name: 'John Smith',
    bio: 'bio',
    subscribers: 3,
    subscriptions: ['1', '2', '3'],
    image: 'https://via.placeholder.com/150',
}


export const mockComment = {
  _id: '1',
  userId: '1',
  videoId: '1',
  description: 'first comment',
  likes: ['1', '2'],
  createdAt: new Date('05 October 2011 14:48 UTC'),
  updatedAt: new Date('05 October 2011 14:48 UTC'),
};

export const mockComments = [mockComment, mockComment, mockComment]