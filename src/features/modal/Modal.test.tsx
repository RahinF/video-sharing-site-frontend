import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { ReactNode, ReactPortal, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

describe('Modal', () => {
  const modalTitle = 'Title';

  const oldCreatePortal = ReactDOM.createPortal;

  beforeAll(() => {
    ReactDOM.createPortal = (node: ReactNode): ReactPortal =>
      node as ReactPortal;
  });

  afterAll(() => {
    ReactDOM.createPortal = oldCreatePortal;
  });

  const Wrapper = ({ testIsOpen = false }: { testIsOpen: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(testIsOpen);

    return (
      <Modal
        title={modalTitle}
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        <button>test</button>
      </Modal>
    );
  };

  test('initial render if open', () => {
    render(<Wrapper testIsOpen={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('backdrop')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /close modal/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test/i })).toBeInTheDocument();
  });

  test('initial render if closed', () => {
    render(<Wrapper testIsOpen={false} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /close modal/i })
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /test/i })
    ).not.toBeInTheDocument();
  });

  test('tab focuses on correct element', async () => {
    render(<Wrapper testIsOpen={true} />);
    user.setup();

    const closeModalButton = screen.getByRole('button', {
      name: /close modal/i,
    });
    const childElement = screen.getByRole('button', { name: /test/i });

    await user.tab();
    expect(childElement).toHaveFocus();

    await user.tab();
    expect(closeModalButton).toHaveFocus();

    await user.tab();
    expect(childElement).toHaveFocus();
  });

  test('shift tab focuses on correct element in reverse', async () => {
    render(<Wrapper testIsOpen={true} />);
    user.setup();

    const closeModalButton = screen.getByRole('button', {
      name: /close modal/i,
    });
    const childElement = screen.getByRole('button', { name: /test/i });

    await user.keyboard('{Shift>}{Tab}');
    expect(childElement).toHaveFocus();

    await user.keyboard('{Shift>}{Tab}');
    expect(closeModalButton).toHaveFocus();

    await user.keyboard('{Shift>}{Tab}');
    expect(childElement).toHaveFocus();
  });

  test('if title render correctly', () => {
    render(<Wrapper testIsOpen={true} />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(modalTitle);
  });

  test('backdrop click closes modal', async () => {
    render(<Wrapper testIsOpen={true} />);
    user.setup();

    const backdrop = screen.getByTestId('backdrop');

    await user.click(backdrop);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('escape press closes modal', async () => {
    render(<Wrapper testIsOpen={true} />);
    user.setup();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
