import { render, screen } from "@testing-library/react";
import Spinner from ".";

test("if spinner displays on screen", () => {
    render(<Spinner />);
    const spinner = screen.getByRole("presentation");
    expect(spinner).toBeInTheDocument();
});
