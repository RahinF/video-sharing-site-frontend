import clsx from 'clsx';
import { FC, forwardRef, useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';
import Error from './Error';
import Label from './Label';

export type Type = 'text' | 'email' | 'password';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  type?: Type;
  required?: boolean;
  error: FieldError | undefined;
  maxLength?: number;
  defaultValue?: string;
}

const TextArea: FC<Props> = forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      id,
      error,
      label,
      maxLength,
      type = 'text',
      required = false,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [length, setLength] = useState<number>(0);

    useEffect(() => {
      if (defaultValue) {
        setLength(defaultValue.length);
      }
    }, [defaultValue]);

    return (
      <div className="flex flex-col gap-2">
        <Label
          htmlFor={id}
          label={label}
          {...(maxLength && { length: { current: length, max: maxLength } })}
          required={required}
        />

        <textarea
          id={id}
          ref={ref}
          className={clsx('textarea bg-primary', {
            'border-error focus:border-error focus:ring-error': error,
          })}
          {...(required && {
            'aria-required': true,
            'aria-invalid': !!error,
          })}
          {...props}
          {...(maxLength && {
            onChange: (event) => setLength(event.target.value.length),
          })}
        />

        {error && <Error>{error.message}</Error>}
      </div>
    );
  }
);

export default TextArea;
