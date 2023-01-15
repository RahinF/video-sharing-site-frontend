import { Warning } from "phosphor-react";

interface Props {
  children: React.ReactNode;
}

const Error: React.FC<Props> = ({ children }) => {
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
