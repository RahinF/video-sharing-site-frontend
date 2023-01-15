import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Input from "../../components/Form/Input";
import { Error } from "../../types/error";
import { useLoginMutation } from "./authApiSlice";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email({
    message:
      "Please provide an email in the correct format e.g. john.doe@gmail.com",
  }),
  password: z.string().min(1, { message: "Password is required." }),
});

type Form = z.infer<typeof schema>;

const Login: FC = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Form>({ mode: "onBlur", resolver: zodResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      await login(data).unwrap();
      reset();
      navigate(-1);
    } catch (error) {
      const result = error as Error;
      if (typeof result.data === "string") {
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
        <p className="text-center text-error">{errorMessage}</p>

        <h1 className="mb-6 text-4xl">Login</h1>
        <div className="grid gap-6">
          <Input
            id="email"
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email}
            required
          />

          <Input
            id="password"
            label="Password"
            type="password"
            {...register("password")}
            error={errors.password}
            required
          />
        </div>

        <div aria-hidden className="mt-8">
          Fields marked with <span className="text-error">*</span> are required.
        </div>

        <div className="mt-8 grid justify-center">
          <button
            disabled={isLoading}
            className={clsx("btn", { loading: isLoading })}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
