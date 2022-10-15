import { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
interface Props {
  onClick: () => void;
  children: React.ReactNode;
  className: string;
}

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  onClick: () => void
) => {
  useEffect(() => {
    document.onmousedown = (event) => {
      const target = event.target as HTMLDivElement;
      if (ref.current && !ref.current.contains(target)) {
        onClick();
      }
    };
    return () => {
      document.onmousedown = null;
    };
  }, [ref, onClick]);
};

const OutSideClick = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, props.onClick);

  return (
    <div ref={ref} className={props.className}>
      {props.children}
    </div>
  );
};

export default OutSideClick;
