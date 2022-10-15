import { useEffect, useState } from "react";
import { useRegisterMutation } from "./authApiSlice";
import { Error } from "../../types/error";
import clsx from "clsx";

interface Props {
  handleModalClose: () => void;
}

const Register = ({ handleModalClose }: Props) => {
  const [register, { isLoading }] = useRegisterMutation();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await register(inputs).unwrap();
      setInputs({ name: "", email: "", password: "" });

      handleModalClose();
    } catch (error) {
      let result = error as Error;
      if (typeof result.data === "string") {
        setErrorMessage(result.data);
      }
    }
  };

  useEffect(() => {
    setErrorMessage("");
  }, [inputs]);

  const nameMaxLength = 30;
  const nameIsTooLong = inputs.name.length > nameMaxLength;

  return (
    <form onSubmit={handleSubmit} className="m-auto max-w-sm">
      <p className="text-center text-error">{errorMessage}</p>

      <div className="grid gap-6">
        <div>
          <div className="flex items-center justify-between">
            <label className="label" htmlFor="name">
              Name
            </label>
            <span
              className={clsx({
                "text-xs": true,
                "text-error": nameIsTooLong,
              })}
            >
              {inputs.name.length}/{nameMaxLength}
            </span>
          </div>
          <input
            id="name"
            name="name"
            className={clsx({
              input: true,
              "input-error": nameIsTooLong,
            })}
            value={inputs.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            value={inputs.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="input"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-8 grid justify-center">
        <button
          disabled={
            isLoading ||
            nameIsTooLong ||
            !inputs.name ||
            !inputs.email ||
            !inputs.password
          }
          className={clsx("btn btn-primary", { loading: isLoading })}
        >
          {isLoading ? "loading..." : "register"}
        </button>
      </div>
    </form>
  );
};

export default Register;
