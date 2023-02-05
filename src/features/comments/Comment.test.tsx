import { screen } from '@testing-library/react';
import { timeAgo } from '../../util/date';
import { mockAuthUser, mockComment, mockUser } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import Comment from './Comment';

const setup = () => {
  renderWithProviders(<Comment comment={mockComment} />, {
    preloadedState: { user: mockAuthUser },
  });
};

describe('Comment', () => {
  beforeEach(() => {
    setup();
  });

  test('links render', async () => {
    expect(await screen.findAllByRole('link')).toHaveLength(2);
  });

  test('links have correct href', async () => {
    expect(
      await screen.findByRole('link', { name: mockUser.name })
    ).toHaveAttribute('href', `/user/${mockUser._id}`);
  });

  test('description renders', async () => {
    expect(
      await screen.findByText(mockComment.description)
    ).toBeInTheDocument();
  });

  test('date posted renders', async () => {
    const createdAt = timeAgo(mockComment.createdAt);
    expect(screen.getByText(createdAt)).toBeInTheDocument();
  });

  test('username renders', async () => {
    expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
  });

  test('user image has correct src', async () => {
    expect(await screen.findByAltText(mockUser.name)).toHaveAttribute(
      'src',
      mockUser.image
    );
  });

  test('like comment button renders', async () => {
    expect(
      screen.getByRole('button', { name: 'like comment' })
    ).toBeInTheDocument();
  });

  test('if logged in comment options menu is displayed', () => {
    expect(
      screen.getByRole('button', { name: 'comment options dropdown menu' })
    ).toBeInTheDocument();
  });
});
