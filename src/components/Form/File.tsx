import clsx from 'clsx';
import { FC, forwardRef, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import Error from './Error';
import Label from './Label';

export type Type = 'text' | 'email' | 'password';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: Type;
  required?: boolean;
  error: FieldError | undefined;
  maxLength?: number;
  children: ReactNode;
}

const File: FC<Props> = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      error,
      label,
      maxLength,
      type = 'text',
      required = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={id}
          label={label}
          required={required}
        />

        <input
          id={id}
          type="file"
          ref={ref}
          className={clsx(
            'file:mr-2 file:h-12 file:cursor-pointer file:border-none file:bg-primary file:py-2 file:px-4 file:text-white',
            {
              'border-error focus:border-error focus:ring-error': error,
            }
          )}
          {...(required && {
            'aria-required': true,
            'aria-invalid': !!error,
          })}
          {...props}
        />

        {error && <Error>{error.message}</Error>}
      </div>
    );
  }
);

export default File;
