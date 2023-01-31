import FocusTrap from 'focus-trap-react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { IconProps } from 'phosphor-react';
import {
  Children,
  cloneElement,
  FC,
  ForwardRefExoticComponent,
  Fragment,
  isValidElement,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  RefAttributes,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
  triggerIcon: ForwardRefExoticComponent<
    IconProps & RefAttributes<SVGSVGElement>
  >;
  ariaLabel: string;
}

const containerVariants: Variants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
  },
  exit: {
    scaleY: 0,
  },
};

const Dropdown: FC<Props> = ({ children, triggerIcon, ariaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = triggerIcon;

  function toggleDropdown() {
    setIsOpen((open) => !open);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const dropdownCaret = (
    <div
      data-testid="caret"
      className="absolute top-14 right-2 z-[2] w-3 overflow-hidden"
    >
      <div className="h-2 w-2 origin-bottom-left rotate-45 transform bg-primary-dark" />
    </div>
  );

  const dropdownBackdrop = (
    <div
      data-testid="backdrop"
      className="fixed top-0 left-0 z-[1] h-screen w-screen"
      onClick={closeDropdown}
    />
  );

  function cloneThroughFragments(children: ReactNode): ReactNode {
    return Children.map(children, (child) => {
      if (!isValidElement(child)) return child;

      if (child.type === Fragment) {
        return cloneThroughFragments(child.props.children);
      }

      return cloneElement(child as ReactElement, {
        onClick: () => {
          child.props.onClick && child.props.onClick();
          closeDropdown();
        },
        className:
          'flex w-full cursor-pointer rounded-lg hover:bg-primary px-4 py-2',
      });
    });
  }

  function handleEscapeKeyPress(event: KeyboardEvent<HTMLDivElement>) {
    if (event.code === 'Escape') {
      closeDropdown();
    }
  }

  return (
    <FocusTrap active={isOpen}>
      <div
        className="relative"
        onKeyDown={handleEscapeKeyPress}
      >
        <button
          type="button"
          onClick={toggleDropdown}
          className="btn-ghost btn-circle btn relative z-[2]"
          aria-expanded={isOpen}
          aria-label={`${ariaLabel} dropdown menu`}
        >
          <Icon size={24} />
        </button>
        <AnimatePresence mode="wait">
          {isOpen && (
            <div className="flex">
              {dropdownBackdrop}
              {dropdownCaret}
              <motion.div
                data-testid="menu"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-16 right-0 z-[2] flex w-40 origin-top flex-col gap-2 rounded-lg bg-primary-dark p-4"
              >
                {cloneThroughFragments(children)}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </FocusTrap>
  );
};

export default Dropdown;
