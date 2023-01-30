import { render } from "@testing-library/react";
import Error from "./Error";

test("if error renders", () => {
  const { getByRole } = render(<Error>error message</Error>);

  expect(getByRole("alert")).toBeInTheDocument();
});
