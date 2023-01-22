import { render, screen } from "@testing-library/react";
import Avatar from ".";

test("if avatar displays if image is provided", async () => {
  render(<Avatar src="url" />);
  const image = await screen.findByTestId("avatar");
  expect(image).toBeInTheDocument();
});

test("if avatar displays if image is not provided", () => {
  render(<Avatar />);
  const image = screen.queryByTestId("avatar");
  expect(image).toBeNull();
});
