import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "../components/Table";
import getData, { columns, albumColumns } from "../constants/data";
const initialState = { data: [], loading: true };

const ApiTable = props => {
  const [data, setData] = useState(initialState);
  useEffect(async () => {
    let url = "https://jsonplaceholder.typicode.com/photos";
    let response = await fetch(url);

    if (response.ok) {
      // if HTTP-status is 200-299
      // get the response body (the method explained below)
      let data = await response.json();
      setData({ data, loading: false });
    } else {
      alert("HTTP-Error: " + response.status);
    }
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
