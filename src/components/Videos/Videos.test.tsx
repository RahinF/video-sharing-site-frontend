import { screen } from '@testing-library/react';
import { Video } from '../../types/video';
import { mockVideos } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import Videos from './Videos';

test('if loading skeleton is displayed', () => {
  const isLoading = true;
  const placeholderCount = 4;
  renderWithProviders(
    <Videos
      isLoading={isLoading}
      videos={mockVideos}
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
      videos={mockVideos}
    />
  );

  expect(screen.getAllByRole('link')).toHaveLength(mockVideos.length);
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
