// Test away!
import React from "react";
import { render, cleanup } from "@testing-library/react";

import Display from "./Display";

afterEach(cleanup);

test("it renders Display", () => {
  const { getByText } = render(<Display closed={false} locked={false} />);
  expect(getByText(/open/i)).toMatchSnapshot();
  expect(getByText(/unlocked/i)).toMatchSnapshot();
});

test("it displays open/closed and if it is locked/unlocked", () => {
  const { getByText, rerender } = render(<Display closed={false} />);
  expect(getByText(/open/i));

  rerender(<Display closed={true} />);
  expect(getByText(/closed/i));

  rerender(<Display locked={true} />);
  expect(getByText(/locked/i));

  rerender(<Display locked={false} />);
  expect(getByText(/unlocked/i));
});

test("it uses the red-led class when locked or closed", () => {
  const { getByText, rerender } = render(<Display locked={true} />);
  getByText(/locked/i);
  expect(getByText(/locked/i).classList.contains("red-led")).toBe(true);

  rerender(<Display closed={true} />);
  getByText(/closed/i);
  expect(getByText(/closed/i).classList.contains("red-led")).toBe(true);
});

test("it uses the green-led class when unlocked or open", () => {
  const { getByText, rerender } = render(<Display locked={false} />);
  getByText(/lock/i);
  expect(getByText(/lock/i).classList.contains("green-led")).toBe(true);

  rerender(<Display closed={false} />);
  getByText(/open/i);
  expect(getByText(/open/i).classList.contains("green-led")).toBe(true);
});
