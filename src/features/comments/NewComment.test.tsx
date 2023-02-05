import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import NewComment from './NewComment';

describe('NewComment', () => {
  const videoId: string = '1';
  const mockCommentInput = 'new comment';

  test('input renders', () => {
    renderWithProviders(<NewComment videoId={videoId} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('input submit and cancel buttons appear when input is clicked', async () => {
    user.setup();
    renderWithProviders(<NewComment videoId={videoId} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    const submitButton = await screen.findByRole('button', {
      name: /comment/i,
    });
    expect(submitButton).toBeInTheDocument();

    const cancelButton = await screen.findByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
  });

  test('input text is correct', async () => {
    user.setup();
    renderWithProviders(<NewComment videoId={videoId} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    await user.type(input, mockCommentInput);
    expect(input).toHaveValue(mockCommentInput);
  });

  test('error shown if invalid input', async () => {
    user.setup();
    renderWithProviders(<NewComment videoId={videoId} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    const submitButton = await screen.findByRole('button', {
      name: /comment/i,
    });

    await user.click(submitButton);
    expect(await screen.findAllByRole('alert')).toHaveLength(1);
  });

  test('input is cleared and focus is removed when submit is successful', async () => {
    user.setup();
    renderWithProviders(<NewComment videoId={videoId} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    await user.type(input, mockCommentInput);
    expect(input).toHaveValue(mockCommentInput);

    const submitButton = await screen.findByRole('button', {
      name: /comment/i,
    });

    await user.click(submitButton);

    await waitFor(() =>
      expect(screen.queryAllByRole('button')).toHaveLength(0)
    );

    expect(input).toHaveValue('');
  });

  test('input cleared, buttons disappear when cancel button is clicked', async () => {
    user.setup();
    renderWithProviders(<NewComment videoId={videoId} />);

    const input = screen.getByRole('textbox');
    await user.click(input);

    await user.type(input, mockCommentInput);
    expect(input).toHaveValue(mockCommentInput);

    const submitButton = await screen.findByRole('button', {
      name: /comment/i,
    });

    const cancelButton = await screen.findByRole('button', { name: /cancel/i });
    expect(cancelButton).toBeInTheDocument();
    await user.click(cancelButton);

    expect(input).toHaveValue('');

    expect(cancelButton).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
  });
});
