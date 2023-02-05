import { render, screen } from "@testing-library/react";
import Avatar from ".";

const src = 'https://via.placeholder.com/150';
const alt = "John Doe"

test("if avatar displays if image is provided", () => {


  render(<Avatar src={src} alt={alt} />);
  expect(screen.getByAltText(alt)).toBeInTheDocument()
});

test("if avatar displays if image is not provided", () => {
  render(<Avatar />);
  expect(screen.queryByAltText(alt)).toBeNull();
});

test("if avatar has src", () => {
  render(<Avatar src={src} alt={alt} />);
  expect(screen.queryByAltText(alt)).toHaveAttribute('src', src);
});
