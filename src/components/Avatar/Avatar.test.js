import { render } from "@testing-library/react";
import Avatar from ".";

test("if avatar displays if image is provided", () => {
  const src = 'https://via.placeholder.com/150';
  const alt = "John Doe"

  const { getByAltText } = render(<Avatar src={src} alt={alt} />);
  expect(getByAltText(alt)).toBeInTheDocument()
});

test("if avatar displays if image is not provided", () => {
  const { queryByAltText } = render(<Avatar />);
  expect(queryByAltText("undefined")).toBeNull();
});
