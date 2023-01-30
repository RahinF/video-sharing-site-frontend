import clsx from "clsx";
import { FC } from "react";

interface Props {
  htmlFor: string;
  label: string;
  length?: {
    current: number;
    max: number;
  };
  required?: boolean;
}

const Label: FC<Props> = ({ htmlFor, label, length, required }) => {
  const hasLengthError: boolean = !!(length && length.current > length.max);

  return (
    <label htmlFor={htmlFor} className="flex justify-between">
      <span>
        {label}{" "}
        {required && (
          <span aria-hidden className="text-error">
            *
          </span>
        )}
      </span>
      {length && (
        <span
          aria-hidden
          className={clsx({
            "text-sm": true,
            "text-error": hasLengthError,
          })}
        >
          {`${length.current} / ${length.max}`}
        </span>
      )}
    </label>
  );
};

export default Label;
