import React from "react";
import "./App.css";
import Table from "./Table";
import getData, { columns } from "./Constants/data";

function App() {
  return (
    <Table
      data={getData(500000)}
      columns={columns}
      onRowClick={item => {
        console.log(item);
      }}
      onSelectionChange={selection => {
        console.log(selection);
      }}
    />
  );
}

export default App;
