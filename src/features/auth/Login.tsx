import { useEffect, useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { Error } from "../../types/error";
import clsx from "clsx";

interface Props {
  handleModalClose: () => void;
}

const Login = ({ handleModalClose }: Props) => {
  const [login, { isLoading }] = useLoginMutation();

  const [inputs, setInputs] = useState({
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
      await login(inputs).unwrap();
      setInputs({ email: "", password: "" });
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

  return (
    <form onSubmit={handleSubmit} className="m-auto max-w-xs">
      <p className="text-center text-error">{errorMessage}</p>

      <div className="grid gap-6">
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
            name="password"
            type="password"
            className="input"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-8 grid justify-center">
        <button
          disabled={isLoading || !inputs.email || !inputs.password}
          className={clsx("btn", { loading: isLoading })}
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Login;
