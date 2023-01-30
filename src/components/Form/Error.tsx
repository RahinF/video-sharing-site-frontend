import { Warning } from "phosphor-react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Error: FC<Props> = ({ children }) => {
  return (
    <span
      role="alert"
      className="mt-2 flex items-center gap-2 text-sm text-error"
    >
      <Warning size={16} weight="fill" /> {children}
    </span>
  );
};

export default Error;
