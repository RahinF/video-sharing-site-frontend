import { screen } from '@testing-library/react';
import Home from '.';
import { mockVideos } from '../../../utils/mockData';
import { renderWithProviders } from '../../../utils/test-utils';

test('initial render', async () => {
  renderWithProviders(<Home type="subscriptions" />);

  expect(screen.getAllByTestId('card-skeleton')).toHaveLength(8);

  expect(await screen.findAllByRole('link')).toHaveLength(mockVideos.length);
  expect(screen.queryAllByTestId('card-skeleton')).toHaveLength(0);
});
