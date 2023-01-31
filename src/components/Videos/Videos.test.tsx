import { screen } from '@testing-library/react';
import { Video } from '../../types/video';
import { renderWithProviders } from '../../utils/test-utils';
import Videos from './Videos';

const videos: Video[] = [
  {
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
  },
];

test('if loading skeleton is displayed', () => {
  const isLoading = true;
  const placeholderCount = 4;
  renderWithProviders(
    <Videos
      isLoading={isLoading}
      videos={videos}
      placeholder={placeholderCount}
    />
  );
  expect(screen.getAllByTestId('card-skeleton')).toHaveLength(placeholderCount);
});

test('if finished loading card is displayed', () => {
  const isLoading = false;

  renderWithProviders(
    <Videos
      isLoading={isLoading}
      videos={videos}
    />
  );

  expect(screen.getAllByRole('link')).toHaveLength(videos.length);
});

test('if there are no videos display text instead', () => {
  const isLoading = false;
  const videos: Video[] = [];

  renderWithProviders(
    <Videos
      isLoading={isLoading}
      videos={videos}
    />
  );

  expect(screen.getByText(/no videos found\./i)).toBeInTheDocument();
});
