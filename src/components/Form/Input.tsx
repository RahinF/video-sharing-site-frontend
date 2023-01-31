import clsx from 'clsx';
import { Eye, EyeSlash } from 'phosphor-react';
import { FC, forwardRef, useEffect, useState } from 'react';
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
  defaultValue?: string;
}

const Input: FC<Props> = forwardRef<HTMLInputElement, Props>(
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
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const passwordType: Type = isVisible ? 'text' : 'password';

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
        <div className="flex">
          <input
            id={id}
            type={type === 'password' ? passwordType : type}
            ref={ref}
            className={clsx('input bg-primary', {
              'border-error focus:border-error focus:ring-error': error,
              'pr-14': type === 'password',
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
          {type === 'password' && (
            <button
              type="button"
              className="-ml-14 px-4"
              onClick={() => setIsVisible((prev) => !prev)}
              aria-label={
                isVisible
                  ? 'Hide password.'
                  : 'Show password as plain text. Warning: this will display your password on the screen.'
              }
            >
              {isVisible ? <EyeSlash size={24} /> : <Eye size={24} />}
            </button>
          )}
        </div>

        {error && <Error>{error.message}</Error>}
      </div>
    );
  }
);

export default Input;
