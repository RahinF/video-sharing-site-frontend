import { FC, ReactNode, useEffect, useRef } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
interface Props {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

const OutSideClick: FC<Props> = ({ onClick, children, className }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.onmousedown = ({ target }) => {
      if (ref.current && !ref.current.contains(target as HTMLDivElement)) {
        onClick();
      }
    };
    return () => {
      document.onmousedown = null;
    };
  }, [ref, onClick]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default OutSideClick;
