import React from "react";
import { render } from "enzyme";
// import { render } from "@testing-library/react";

import Table from "./Table";
import getData from "../Constants/data";
it("should give test data array", () => {
  const data = getData(5000);
  console.log(data.length);
  expect(data).toHaveLength(5001);
});
it("renders without crashing", () => {
  const wrapper = render(<Table data={getData(500000)} col />);
  // console.log(wrapper.find("table"));

  expect(wrapper).toMatchSnapshot();
});
