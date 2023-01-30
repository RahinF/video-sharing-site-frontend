import { render, screen } from "@testing-library/react";
import Label from "./Label";

test("if label text renders", () => {
  const labelText = "Test";
  const { getByText } = render(<Label htmlFor="test" label={labelText} />);
  expect(getByText(labelText)).toBeInTheDocument();
});

test("if length count text renders", () => {
  const length = { current: 5, max: 10 };
  const lengthText = `${length.current} / ${length.max}`;
  const { getByText } = render(
    <Label htmlFor="test" label="Test" length={length} />
  );
  expect(getByText(lengthText)).toBeInTheDocument();
});
