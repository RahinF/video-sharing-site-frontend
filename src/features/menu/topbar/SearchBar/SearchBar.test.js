import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBar from ".";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

test("if button to open searchbar renders", () => {
    render(<SearchBar />);
    expect(screen.getByRole("button")).toBeInTheDocument();
});

test("if searchbar renders when openeded", async () => {
    user.setup();
    render(<SearchBar />);

    const button = screen.getByRole("button");
    await user.click(button);

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
});

test("if searchbar accepts text", async () => {
    const value = "Drone";
    user.setup();
    render(<SearchBar />);

    const button = screen.getByRole("button", { name: 'open search' });
    await user.click(button);

    const input = screen.getByRole("textbox");
    await user.type(input, value);

    expect(input).toHaveValue(value);
});

test("if elements receive focus in right order", async () => {

    user.setup();
    render(<SearchBar />);

    const button = screen.getByRole("button", { name: 'open search' });
    await user.tab()
    expect(button).toHaveFocus();
    await user.click(button);

    const input = screen.getByRole("textbox");
    expect(input).toHaveFocus();

    await user.tab()
    const searchButton = screen.getByRole("button", { name: 'search' });
    expect(searchButton).toHaveFocus();
});
