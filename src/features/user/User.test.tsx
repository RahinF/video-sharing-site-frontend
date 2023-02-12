import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import pluralize from 'pluralize';
import Router from 'react-router-dom';
import User, { filters } from '.';
import { mockAuthUser, mockUser, mockVideos } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('User', () => {
  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('avatar displays', async () => {
    renderWithProviders(<User />);
    const avatar = await screen.findByAltText(mockUser.name);
    expect(avatar).toBeInTheDocument();
  });

  test('username displays', async () => {
    renderWithProviders(<User />);
    const username = await screen.findByText(mockUser.name);
    expect(username).toBeInTheDocument();
  });

  test('edit user button displays', () => {
    renderWithProviders(<User />, { preloadedState: { user: mockAuthUser } });
    const editButton = screen.getByRole('button', { name: /edit user/i });
    expect(editButton).toBeInTheDocument();
  });

  test('subscribe button displays', () => {
    renderWithProviders(<User />, {
      preloadedState: { user: { id: '99', image: null, subscriptions: [] } },
    });
    const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
    expect(subscribeButton).toBeInTheDocument();
  });

  test('subscriber count displays', async () => {
    renderWithProviders(<User />);
    const subscriberCountText = `${mockUser.subscribers} ${pluralize(
      'subscriber',
      mockUser.subscribers
    )}`;
    const subscriberCount = await screen.findByText(subscriberCountText);
    expect(subscriberCount).toBeInTheDocument();
  });

  test('subscription count displays', async () => {
    renderWithProviders(<User />);
    const subscriptionCountText = `${mockUser.subscriptions.length} ${pluralize(
      'subscription',
      mockUser.subscriptions.length
    )}`;
    const subscriptionCount = await screen.findByText(subscriptionCountText);
    expect(subscriptionCount).toBeInTheDocument();
  });

  test('likes displays', async () => {
    renderWithProviders(<User />);
    const likeCount = mockVideos
      .map((video) => video.likes.length)
      .reduce((prev, curr) => prev + curr, 0);

    const likesText = `${likeCount} ${pluralize('like', likeCount)}`;
    const likes = await screen.findByText(likesText);
    expect(likes).toBeInTheDocument();
  });

  test('bio displays', async () => {
    renderWithProviders(<User />);
    const defaultBio = screen.getByText('no bio');
    expect(defaultBio).toBeInTheDocument();

    const userBio = await screen.findByText(mockUser.bio);
    expect(userBio).toBeInTheDocument();
  });

  test('videos display', async () => {
    renderWithProviders(<User />);
    const videos = await screen.findAllByRole('link');
    expect(videos).toHaveLength(mockVideos.length);
  });

  test('selected filter displays by default', () => {
    renderWithProviders(<User />);

    const defaultText = `${filters.enum.latest} ${pluralize(
      'video',
      mockVideos.length
    )}`;
    const filterText = screen.getByRole('heading', { level: 1 });
    expect(filterText).toBeInTheDocument();
    expect(filterText).toHaveTextContent(defaultText);
  });

  test('filter buttons displays', () => {
    renderWithProviders(<User />);
    const filterButtons = screen.getAllByRole('button');
    expect(filterButtons).toHaveLength(filters.options.length);
  });

  test('filter buttons change heading text', async () => {
    user.setup();
    renderWithProviders(<User />);

    const latestButton = screen.getByRole('button', {
      name: `filter videos by ${filters.enum.latest}`,
    });

    const mostViewedButton = screen.getByRole('button', {
      name: `filter videos by ${filters.enum['most viewed']}`,
    });

    const topRatedButton = screen.getByRole('button', {
      name: `filter videos by ${filters.enum['top rated']}`,
    });

    const latestText = `${filters.enum.latest} ${pluralize(
      'video',
      mockVideos.length
    )}`;

    const mostViewedText = `${filters.enum['most viewed']} ${pluralize(
      'video',
      mockVideos.length
    )}`;

    const topRatedText = `${filters.enum['top rated']} ${pluralize(
      'video',
      mockVideos.length
    )}`;

    const filterHeading = screen.getByRole('heading', { level: 1 });

    expect(latestButton).toBeInTheDocument();
    expect(mostViewedButton).toBeInTheDocument();
    expect(topRatedButton).toBeInTheDocument();
    expect(filterHeading).toBeInTheDocument();

    expect(filterHeading).toHaveTextContent(latestText);

    await user.click(mostViewedButton);
    expect(filterHeading).toHaveTextContent(mostViewedText);

    await user.click(topRatedButton);
    expect(filterHeading).toHaveTextContent(topRatedText);

    await user.click(latestButton);
    expect(filterHeading).toHaveTextContent(latestText);
  });
});
