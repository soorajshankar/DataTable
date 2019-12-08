import React from "react";
import "./App.css";
import Table from "./components/Table";
import getData, { columns } from "./constants/data";
import ApiTable from "./containers/ApiTable";

const App = () => {
  return (
    <div id="root" style={{ padding: 10, height: "100vh" }}>
      <div style={{ height: "50%", overflow: "hidden" }}>
        <h2>With 500000 data points</h2>
        <Table
          data={getData(500000)}
          columns={columns}
          height="100%"
          onRowClick={item => {
            console.log(item);
          }}
          onSelectionChange={selection => {
            console.log(selection);
          }}
        />
      </div>
      <div style={{ height: "40%" }}>
        <h2>Table fetching data from api</h2>
        <ApiTable />
      </div>
    </div>
  );
};

export default App;
