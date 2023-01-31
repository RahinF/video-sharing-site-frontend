import FocusTrap from 'focus-trap-react';
import { X } from 'phosphor-react';
import { KeyboardEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

const Modal = ({ title, children, isOpen, handleClose }: Props) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  const handleEscapeKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <FocusTrap>
      <div
        onKeyDown={handleEscapeKeyPress}
        className="fixed top-0 left-0 z-50 grid h-full w-full place-items-center bg-black/50"
        role="dialog"
      >
        <div className="scrollbar-thin max-h-[90%] w-5/6 max-w-xl overflow-y-auto rounded-xl bg-base-200 p-4">
          <div className="sticky -top-4 z-50 grid grid-cols-3 items-center bg-base-200 py-4">
            <h1 className="col-start-2 justify-self-center text-xl font-medium">
              {title}
            </h1>
            <button
              onClick={handleClose}
              aria-label="close modal"
              className="btn-ghost btn-circle btn justify-self-end"
            >
              <X size={24} />
            </button>
          </div>
          {children}
        </div>
      </div>
    </FocusTrap>,
    document.getElementById('modal-root')!
  );
};

export default Modal;
