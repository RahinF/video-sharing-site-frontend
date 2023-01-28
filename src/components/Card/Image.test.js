import { render } from "@testing-library/react";
import Image from "./Image";


test("if image displays", () => {
  const src = 'https://via.placeholder.com/150';
  const { getByRole } = render(<Image src={src} />);
  expect(getByRole("img")).toBeInTheDocument();
});

