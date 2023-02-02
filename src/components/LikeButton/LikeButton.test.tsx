import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import LikeButton from '.';
import { mockUser } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';

test('if renders', () => {
  const likes: string[] = [];
  const handleLike = jest.fn();
  const handleUnlike = jest.fn();
  renderWithProviders(
    <LikeButton
      likes={likes}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />
  );

  expect(screen.getByRole('button')).toBeInTheDocument();
  expect(screen.getByTestId('like icon').classList.length).toBe(0);
  expect(screen.getByText(`${likes.length}`)).toBeInTheDocument();
});

test('if not logged in button doesnt fire', async () => {
  const likes: string[] = [];
  const handleLike = jest.fn();
  const handleUnlike = jest.fn();

  renderWithProviders(
    <LikeButton
      likes={likes}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />
  );

  user.setup();
  const likeButton = screen.getByRole('button');
  await user.click(likeButton);
  expect(screen.getByTestId('like icon').classList.length).toBe(0);
  expect(handleLike).not.toBeCalled();
  expect(handleUnlike).not.toBeCalled();
});

test('if clicked user is added to likes', async () => {
  const likes: string[] = [];
  const handleLike = jest.fn();
  const handleUnlike = jest.fn();

  renderWithProviders(
    <LikeButton
      likes={likes}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />,
    {
      preloadedState: {
        user: mockUser,
      },
    }
  );

  user.setup();
  const likeButton = screen.getByRole('button');
  await user.click(likeButton);
  expect(handleLike).toBeCalled();
});

test('if user is in likes list remove them', async () => {
  const likes: string[] = [`${mockUser.id}`];
  const handleLike = jest.fn();
  const handleUnlike = jest.fn();

  renderWithProviders(
    <LikeButton
      likes={likes}
      handleLike={handleLike}
      handleUnlike={handleUnlike}
    />,
    {
      preloadedState: {
        user: mockUser,
      },
    }
  );

  user.setup();
  const likeButton = screen.getByRole('button');
  await user.click(likeButton);
  expect(handleUnlike).toBeCalled();
});
