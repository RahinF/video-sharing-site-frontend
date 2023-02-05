import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import SubscribeButton from '.';
import { mockAuthUser } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';

const videoOwner = {
  _id: '99',
  name: 'Jane Smith',
  bio: '',
  subscribers: 0,
  subscriptions: [],
  image: '',
  email: '',
};

const videoOwnerAlreadyInUserSubscriptions = { ...videoOwner, _id: '2' };

test('button renders', () => {
  renderWithProviders(<SubscribeButton videoOwner={videoOwner} />);

  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('displays subscribed as button text if user is already subscribed', async () => {
  renderWithProviders(
    <SubscribeButton videoOwner={videoOwnerAlreadyInUserSubscriptions} />,
    {
      preloadedState: { user: mockAuthUser },
    }
  );

  expect(screen.getByText('subscribed')).toBeInTheDocument();
});

test('on click button fires event and text changes to subscribed', async () => {
  renderWithProviders(<SubscribeButton videoOwner={videoOwner} />, {
    preloadedState: { user: mockAuthUser },
  });

  user.setup();
  const button = screen.getByRole('button');
  await user.click(button);
  expect(await screen.findByText('subscribed')).toBeInTheDocument();
});

test('on click button fires event and text changes to subscribe', async () => {
  renderWithProviders(
    <SubscribeButton videoOwner={videoOwnerAlreadyInUserSubscriptions} />,
    {
      preloadedState: { user: mockAuthUser },
    }
  );

  user.setup();
  const button = await screen.findByRole('button');
  await user.click(button);
  expect(await screen.findByText('subscribe')).toBeInTheDocument();
});
