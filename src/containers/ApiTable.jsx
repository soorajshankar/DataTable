import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../components/Table";
import getData, { columns, albumColumns } from "../constants/data";
const initialState = { data: [], loading: true };

const ApiTable = props => {
  const [data, setData] = useState(initialState);
  const fetchData = () => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then(resp => resp.json())
      .then(data => setData({ data, loading: false }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {data.loading ? (
        "Loading..."
      ) : (
        <Table
          data={data.data}
          columns={albumColumns}
          //   height="100"
          onRowClick={item => {
            console.log(item);
          }}
          onSelectionChange={selection => {
            console.log(selection);
          }}
        />
      )}
    </div>
  );
};

ApiTable.propTypes = {};

export default ApiTable;
