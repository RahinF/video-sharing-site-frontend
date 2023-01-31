import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Input from '../../components/Form/Input';
import { Error } from '../../types/error';
import { useRegisterMutation } from './authApiSlice';

const NAME_MAX_LENGTH: number = 30;

const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(NAME_MAX_LENGTH, {
      message: `Name cannot be more than ${NAME_MAX_LENGTH} characters.`,
    }),
  email: z.string().min(1, { message: 'Email is required.' }).email({
    message:
      'Please provide an email in the correct format e.g. john.doe@gmail.com',
  }),
  password: z
    .string()
    .min(1, { message: 'Password is required.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
      message:
        'Password must contain 8 characters including at least 1 letter and 1 number.',
    }),
});

type Form = z.infer<typeof schema>;

const Register: FC = () => {
  const [createAccount, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({ mode: 'onBlur', resolver: zodResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await createAccount(data).unwrap();
      navigate('/', { replace: true });
    } catch (error) {
      let result = error as Error;
      if (typeof result.data === 'string') {
        setErrorMessage(result.data);
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <main className="grid min-h-screen place-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl rounded bg-primary-dark py-6 px-10"
      >
        <p className="mb-10 text-center text-error">{errorMessage}</p>

        <h1 className="mb-6 text-center text-3xl">Register</h1>
        <div className="grid gap-6">
          <Input
            id="name"
            label="Name"
            {...register('name')}
            error={errors.name}
            maxLength={NAME_MAX_LENGTH}
            required
          />

          <Input
            id="email"
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            {...register('password')}
            error={errors.password}
            required
          />
        </div>

        <div
          aria-hidden
          className="mt-8"
        >
          Fields marked with <span className="text-error">*</span> are required.
        </div>

        <div className="mt-8 grid justify-center">
          <button
            disabled={isLoading}
            className={clsx('btn', { loading: isLoading })}
          >
            {isLoading ? 'loading...' : 'register'}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
