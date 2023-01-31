import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { renderWithProviders } from '../../utils/test-utils';
import Register from './Register';

const setup = () => renderWithProviders(<Register />);

describe('Register', () => {
  test('form elements render', () => {
    setup();

    const name = screen.getByRole('textbox', { name: /name/i });
    expect(name).toBeInTheDocument();

    const email = screen.getByRole('textbox', { name: /email/i });
    expect(email).toBeInTheDocument();

    const password = screen.getByLabelText(/password \*/i);
    expect(password).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /register/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('errors display when fields are submitted with no values', async () => {
    setup();
    user.setup();

    await user.click(screen.getByRole('button', { name: /register/i }));

    const errors = await screen.findAllByRole('alert');
    expect(errors).toHaveLength(3);
  });

  test('if email fields accepts a value', async () => {
    setup();
    user.setup();
    const value = 'test@test.com';
    const email = screen.getByRole('textbox', { name: /email/i });
    await user.type(email, value);

    expect(email).toHaveValue(value);
  });

  test('if error display if email value is wrong format', async () => {
    setup();
    user.setup();

    const emailValue = 'test';
    const email = screen.getByRole('textbox', { name: /email/i });
    await user.type(email, emailValue);

    const passwordValue = 'test1234';
    const password = screen.getByLabelText(/password \*/i);
    await user.type(password, passwordValue);

    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    const errors = await screen.findAllByRole('alert');
    expect(errors).toHaveLength(1);
  });

  test('if error displays when name is greater than max', async () => {
    setup();
    user.setup();
    const maxLength = 30;
    const value = '#'.repeat(maxLength + 1);
    const name = screen.getByRole('textbox', {
      name: /name/i,
    }) as HTMLInputElement;
    await user.type(name, value);

    const emailValue = 'test@test.com';
    const email = screen.getByRole('textbox', { name: /email/i });
    await user.type(email, emailValue);

    const passwordValue = 'test1234';
    const password = screen.getByLabelText(/password \*/i);
    await user.type(password, passwordValue);

    const submitButton = screen.getByRole('button', { name: /register/i });
    await user.click(submitButton);

    expect(name.value.length).toBeGreaterThan(maxLength);
    
    const errors = await screen.findAllByRole('alert');
    expect(errors).toHaveLength(1);
  });

  test('if password fields accepts a value', async () => {
    setup();
    user.setup();
    const value = 'test1234';
    const password = screen.getByLabelText(/password \*/i);
    await user.type(password, value);

    expect(password).toHaveValue(value);
  });
});
