import React from "react";
import { render } from "enzyme";
// import { render } from "@testing-library/react";

import Table, { getArray } from "./Table";
import getData, { columns } from "../../constants/data";
const hugeData = getData(500000);
it("should give test data array", () => {
  const data = getData(5000);
  console.log(data.length);
  expect(data).toHaveLength(5001);
});
it("should get array for next virtual page", () => {
  const data = getArray({ size: 30, current: [], data: hugeData });
  console.error(data.length);
  expect(data).toHaveLength(31);
  expect(data[0]._id).toBe(0);
  expect(data[30].name).toBe("30 Guy");
});
describe("Rendering Tests", () => {
  it("should match the snapshot", () => {
    const wrapper = render(
      <Table
        data={hugeData}
        columns={columns}
        height="100%"
        onRowClick={item => {
          console.log(item);
        }}
        onSelectionChange={selection => {
          console.log(selection);
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
