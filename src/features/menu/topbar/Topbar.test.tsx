import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Topbar from '.';
import * as hooks from '../../../hooks/useWindowSize';
import { mockAuthUser } from '../../../utils/mockData';
import { renderWithProviders } from '../../../utils/test-utils';

describe('Topbar', () => {
  const setup = (isLoggedIn: boolean) => {
    if (isLoggedIn) {
      renderWithProviders(<Topbar />, {
        preloadedState: { user: mockAuthUser },
      });
    } else {
      renderWithProviders(<Topbar />);
    }
  };

  test('home link renders', () => {
    setup(false);
    expect(
      screen.getByRole('link', { name: /WatchTV Home/i })
    ).toBeInTheDocument();
  });

  test('links when not logged in renders', async () => {
    setup(false);
    user.setup();
    const dropdownButton = screen.getByRole('button', {
      name: /user actions dropdown menu/i,
    });
    await user.click(dropdownButton);
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
  });

  test('links when logged in renders', async () => {
    setup(true);
    user.setup();
    const dropdownButton = screen.getByRole('button', {
      name: /user actions dropdown menu/i,
    });
    await user.click(dropdownButton);
    expect(
      screen.getByRole('link', { name: /my channel/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  test('upload link renders', async () => {
    setup(true);

    expect(screen.getByRole('link', { name: /upload/i })).toBeInTheDocument();
  });

  test('open menu button renders on small screens', async () => {
    const smScreenWidth = 500;
    jest.spyOn(hooks, 'default').mockImplementation(() => smScreenWidth);
    setup(true);
    expect(
      screen.getByRole('button', { name: /open menu/i })
    ).toBeInTheDocument();
  });

  test('open menu button doesnt render on large screens', async () => {
    const lgScreenWidth = 9000;
    jest.spyOn(hooks, 'default').mockImplementation(() => lgScreenWidth);
    setup(true);
    expect(
      screen.queryByRole('button', { name: /open menu/i })
    ).not.toBeInTheDocument();
  });
});
