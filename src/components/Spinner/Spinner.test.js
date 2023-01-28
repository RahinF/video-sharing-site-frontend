import { render } from "@testing-library/react";
import Spinner from ".";

test("if spinner displays on screen", () => {
    const { getByRole } = render(<Spinner />);
    expect(getByRole("presentation")).toBeInTheDocument();
});
