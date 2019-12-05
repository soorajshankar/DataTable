import React from "react";
import "./App.css";
import Table from "./Table";
import getData, { columns } from "./Constants/data";

function App() {
  return (
    <Table
      data={getData(5000)}
      columns={columns}
      onRowClick={(rowData, rowIndex) => {}}
    />
  );
}

export default App;
