import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Subscription from '.';
import { renderWithProviders } from '../../../../utils/test-utils';

const userId = '1';
const mockCloseMenu = jest.fn();

test('username is displayed', async () => {
  renderWithProviders(
    <Subscription
      userId={userId}
      closeMenu={mockCloseMenu}
    />
  );

  expect(await screen.findByText('John Smith')).toBeInTheDocument();
});

test('if link has correct href', async () => {
  renderWithProviders(
    <Subscription
      userId={userId}
      closeMenu={mockCloseMenu}
    />
  );

  expect(screen.getByRole('link')).toHaveAttribute('href', `/user/${userId}`);
});

test('if close menu fires when link is clicked', async () => {
  user.setup();
  renderWithProviders(
    <Subscription
      userId={userId}
      closeMenu={mockCloseMenu}
    />
  );

  const link = screen.getByRole('link');
  await user.click(link);
  expect(mockCloseMenu).toBeCalled();
});
