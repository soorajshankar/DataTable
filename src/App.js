import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Table from "./Table";

function App() {
  return <Table data={getData(5000)} />;
}
const getData = size => {
  let data = [];
  for (let i = 0; i <= size; i++) {
    data.push({ id: i, name: `${i} Guy` });
  }
  return data;
};

export default App;
