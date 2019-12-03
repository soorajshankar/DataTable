import React, { useState } from "react";

const columns = [
  {
    label: "ID",
    id: "id",
    // renderer: val => <span style={{ color: "red" }}>{val}</span>,
    width: "100px",
    numeric: true
  },
  {
    label: "NAME",
    id: "name",
    numeric: false
  },
  {
    label: "IID",
    id: "id",
    numeric: true
  }
];

const Li = ({ i }) => (
  <tr className="table-row">
    {columns.map(c => {
      const renderer = i[c.id]; // (React.ReactNode | string | number),
      return (
        <td
          className="c-child child "
          {...{
            ...(c.numeric && { align: "right" }),
            ...(c.width && { width: c.width })
          }}
        >
          {renderer}
        </td>
      );
    })}
  </tr>
);
const renderColumns = columns =>
  columns.map(({ label = "", numeric = false, width }) => {
    const renderer = label;
    return (
      <td
        className="c-child child "
        {...{ ...(numeric && { align: "right" }), ...(width && { width }) }}
      >
        {renderer}
      </td>
    );
  });
const getArray = ({ size = 10, current = [], data }) => {
  // if last elements are same do nothing
  if (data[data.length - 1] === current[current.length - 1]) return current;

  // else proceed
  const newState = [...current];
  const max = current[current.length - 1] ? current[current.length - 1].id : 0;
  for (let i = max; i < max + size; i++) {
    // sliding window
    if (data[i + 1]) newState.push(data[i + 1]);
  }
  if (newState.length > 3 * size) {
    newState.splice(0, newState.length - 2 * size);
  } else if (newState.length > size) newState.splice(0, size - 1);
  return newState;
};

const getPrevArray = ({ size = 10, current = [], data }) => {
  // if first elements are same do nothing
  if (data[0].id === current[0].id) return current;

  // else proceed
  let newState = [];
  const min = current[0].id > 10 ? data[current[0].id - 10].id : 0;
  for (let i = current[0].id; i > min; i--) {
    // sliding window
    if (data[i - 1]) newState.unshift(data[i - 1]);
  }
  newState = [...newState, ...current];
  if (newState.length > 3 * size) {
    // cleaning up with window size for better performance
    newState = newState.slice(0, 2 * size);
  }
  return [...newState];
};
const Table = ({ data = [] }) => {
  const [current, set] = useState(getArray({ size: 30, current: [], data }));
  const onScroll = e => {
    window.ee = { ...e };
    let o = e.target;
    if (o.scrollTop == 0) {
      // reached top most for smooth scrolling, considering this as a seperate event and handling with help of event loop
      set(current => {
        return getPrevArray({ size: 30, current, data });
      });
      o.scrollTo(1, 1);
    } else if (o.scrollTop < 150) {
      // direct window sliding, prev window
      set(getPrevArray({ size: 30, current, data }));
    } else if (o.offsetHeight + o.scrollTop >= o.scrollHeight) {
      // direct window sliding next window
      set(getArray({ size: 30, current, data }));
    }
  };
  return (
    <div className="App">
      <table style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="table-row">{renderColumns(columns)}</tr>
        </thead>
        <tbody className="c-container" onScroll={onScroll}>
          {current.map(i => (
            <Li key={i.id} i={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
