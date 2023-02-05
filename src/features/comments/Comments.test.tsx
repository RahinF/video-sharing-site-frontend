import { screen } from '@testing-library/react';
import { mockAuthUser, mockComments } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import Comments from './Comments';

const videoId: string = '1';

test('should render', async () => {
  renderWithProviders(<Comments videoId={videoId} />);

  expect(
    await screen.findByText(`${mockComments.length} Comments`)
  ).toBeInTheDocument();

  expect(await screen.findAllByTestId('comment')).toHaveLength(
    mockComments.length
  );
});

test('loading skeleton should be displayed initially and removed once loaded', async () => {
  renderWithProviders(<Comments videoId={videoId} />);
  expect(screen.getAllByTestId('comment-skeleton')).toHaveLength(3);

  expect(await screen.findAllByTestId('comment')).toHaveLength(
    mockComments.length
  );

  expect(screen.queryAllByTestId('comment-skeleton')).toHaveLength(0);
});

test('new comment form displays if logged in', () => {
  renderWithProviders(<Comments videoId={videoId} />, {
    preloadedState: { user: mockAuthUser },
  });

  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
