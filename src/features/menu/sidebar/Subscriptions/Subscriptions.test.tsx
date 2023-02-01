import { screen } from '@testing-library/react';
import Subscriptions from '.';
import { renderWithProviders } from '../../../../utils/test-utils';

const mockCloseMenu = jest.fn();
const mockAuthToken = { token: '1' };
const mockUser = { id: '1', image: null, subscriptions: ['1', '2'] };

test('if not logged in do not render', () => {
  renderWithProviders(<Subscriptions closeMenu={mockCloseMenu} />);

  expect(screen.queryByText(/subscriptions/i)).not.toBeInTheDocument();
});

test('renders when logged in', () => {
  renderWithProviders(<Subscriptions closeMenu={mockCloseMenu} />, {
    preloadedState: {
      auth: mockAuthToken,
    },
  });

  expect(
    screen.getByText(/accounts you have subscribed to will appear here./i)
  ).toBeInTheDocument();
});

test('if subscriptions render if user has subscriptions', () => {
  renderWithProviders(<Subscriptions closeMenu={mockCloseMenu} />, {
    preloadedState: {
      auth: mockAuthToken,
      user: mockUser,
    },
  });

  expect(screen.getAllByRole('listitem')).toHaveLength(
    mockUser.subscriptions.length
  );
});
