import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
it("renders welcome message", () => {
  const wrapper = render(<App />);
  // console.log(wrapper.find("table").debug());
  expect(wrapper).toMatchSnapshot();
});
