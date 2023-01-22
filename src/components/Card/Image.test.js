import { render, screen } from "@testing-library/react";
import Image from "./Image";


test("if image displays", async () => {
  render(<Image src="url" />);
  const image = await screen.findByTestId("image");
  expect(image).toBeInTheDocument();
});

