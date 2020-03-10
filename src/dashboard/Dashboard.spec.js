// Test away
import React from "react";
import { render } from "@testing-library/react";

import Dashboard from "./Dashboard";

test("it renders Dashboard without errors", () => {
  const { getByText } = render(<Dashboard />);
  expect(getByText(/locked/i)).toMatchSnapshot();
  expect(getByText(/open/i)).toMatchSnapshot();
});
