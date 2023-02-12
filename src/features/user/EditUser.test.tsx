import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Router from 'react-router-dom';
import { mockUser } from '../../utils/mockData';
import { renderWithProviders } from '../../utils/test-utils';
import EditUser from './EditUser';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: () => mockedUsedNavigate,
}));

describe('EditUser', () => {
  const modalClose = jest.fn();
  window.URL.createObjectURL = () => 'http://image-here.com';
  window.URL.revokeObjectURL = jest.fn();

  beforeEach(() => {
    jest.spyOn(Router, 'useParams').mockReturnValue({ id: '1234' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initial render', () => {
    renderWithProviders(<EditUser handleModalClose={modalClose} />);

    const name = screen.getByRole('textbox', { name: /name/i });
    const bio = screen.getByRole('textbox', { name: /bio/i });
    const image = screen.getByLabelText(/image/i);
    const deleteButton = screen.getByRole('button', {
      name: /delete account/i,
    });
    const updateButton = screen.getByRole('button', { name: /update/i });

    expect(name).toBeInTheDocument();
    expect(bio).toBeInTheDocument();
    expect(image).toBeInTheDocument();

    expect(deleteButton).toBeInTheDocument();
    expect(updateButton).toBeInTheDocument();
  });

  test('if error displays when name input is empty', async () => {
    renderWithProviders(<EditUser handleModalClose={modalClose} />);
    user.setup();

    const name = screen.getByRole('textbox', { name: /name/i });
    expect(name).toHaveValue('');

    const updateButton = screen.getByRole('button', { name: /update/i });
    expect(updateButton).toBeInTheDocument();

    await user.click(updateButton);

    const error = await screen.findByRole('alert');
    expect(error).toBeInTheDocument();
  });

  test('if image displays when file is uploaded', async () => {
    renderWithProviders(<EditUser handleModalClose={modalClose} />);
    user.setup();

    const testImageFile = new File(['hello'], 'hello.png', {
      type: 'image/png',
    });
    const image = (await screen.findByLabelText(/image/i)) as HTMLInputElement;

    expect(image.files?.length).toBe(0);
    await user.upload(image, testImageFile);

    expect(image.files?.length).toBe(1);

    const avatar = await screen.findByAltText(mockUser.name);
    expect(avatar).toBeInTheDocument();
  });

  test('if remove button renders when file is uploaded', async () => {
    renderWithProviders(<EditUser handleModalClose={modalClose} />);
    user.setup();

    const testImageFile = new File(['hello'], 'hello.png', {
      type: 'image/png',
    });
    const image = (await screen.findByLabelText(/image/i)) as HTMLInputElement;

    expect(image.files?.length).toBe(0);
    await user.upload(image, testImageFile);

    expect(image.files?.length).toBe(1);

    const button = await screen.findByRole('button', { name: /remove/i });
    expect(button).toBeInTheDocument();
  });

  test('if remove button click image is removed', async () => {
    renderWithProviders(<EditUser handleModalClose={modalClose} />);
    user.setup();

    const testImageFile = new File(['hello'], 'hello.png', {
      type: 'image/png',
    });
    const image = (await screen.findByLabelText(/image/i)) as HTMLInputElement;

    expect(image.files?.length).toBe(0);
    await user.upload(image, testImageFile);

    expect(image.files?.length).toBe(1);

    const button = await screen.findByRole('button', { name: /remove/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(image).not.toBeInTheDocument();
  });

  test.todo('if delete button fires');

  test('if update button fires', async () => {
    renderWithProviders(<EditUser handleModalClose={modalClose} />);
    user.setup();

    const name = screen.getByRole('textbox', { name: /name/i });
    await user.type(name, 'value');

    const updateButton = screen.getByRole('button', {
      name: /update/i,
    });
    expect(updateButton).toBeInTheDocument();

    await user.click(updateButton);

    expect(
      await screen.findByRole('button', { name: /updating/i })
    ).toBeInTheDocument();

    await waitFor(async () => {
      expect(
        await screen.findByRole('button', { name: /update/i })
      ).toBeInTheDocument();
    });
  });
});
