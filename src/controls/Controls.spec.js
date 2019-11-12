// Test away!
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";

import Controls from "./Controls";

afterEach(cleanup);

test("it renders the controls", () => {
  const { getByText } = render(<Controls closed={false} locked={false} />);

  expect(getByText(/lock gate/i)).toMatchSnapshot();
  expect(getByText(/close gate/i)).toMatchSnapshot();
});

test("it locks the gate", () => {
  const toggleLockedMock = jest.fn();
  const { getByText } = render(
    <Controls closed={true} locked={false} toggleLocked={toggleLockedMock} />
  );
  fireEvent.click(getByText(/lock gate/i));
  expect(toggleLockedMock).toHaveBeenCalled();
});

test("it closes the gate", () => {
  const toggleClosedMock = jest.fn();
  const { getByText } = render(
    <Controls closed={false} locked={false} toggleClosed={toggleClosedMock} />
  );

  fireEvent.click(getByText(/close gate/i));
  expect(toggleClosedMock).toHaveBeenCalled();
});

test("it can't open the gate if locked", () => {
  //check if open button disabled
  const { getByText } = render(<Controls closed={true} locked={true} />);

  expect(getByText(/open gate/i).disabled === true);
});

test("it can't lock the gate if open", () => {
  //check if lock button disabled
  const { getByText } = render(<Controls closed={false} locked={false} />);

  expect(getByText(/lock gate/i).disabled === true);
});
