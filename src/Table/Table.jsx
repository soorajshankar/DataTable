import React, { useState, useEffect } from "react";

export const Li = ({ i, ri, columns }) => {
  columns = [{ label: "_checkbox", width: "10px" }, ...columns];
  return (
    <tr className="table-row">
      {columns.map((c, ci) => {
        const renderer =
          c.label === "_checkbox" ? <input type="checkbox" /> : i[c.id]; // (React.ReactNode | string | number),

        return (
          <td
            key={`${ci}-${ri}`}
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
};
export const renderColumns = columns => {
  columns = [{ label: "_checkbox" }, ...columns];
  return columns.map(({ label = "", numeric = false, width }, ci) => {
    const renderer = label === "_checkbox" ? <input type="checkbox" /> : label;
    return (
      <td
        key={ci}
        className="c-child child "
        {...{ ...(numeric && { align: "right" }), ...(width && { width }) }}
      >
        {renderer}
      </td>
    );
  });
};
export const renderColGroups = columns => {
  columns = [{ label: "_checkbox" }, ...columns];
  return (
    <colgroup>
      {columns.map(({ label = "", numeric = false, width }, ci) => {
        const renderer =
          label === "_checkbox" ? <input type="checkbox" /> : label;
        return <col></col>;
      })}
    </colgroup>
  );
};

export const getArray = ({ size = 10, current = [], data }) => {
  // if last elements are same do nothing
  if (data[data.length - 1] === current[current.length - 1]) return current;

  // else proceed
  let newState = [...current];
  const max = current[current.length - 1]
    ? current[current.length - 1]._id || 0
    : 0;
  //   debugger;
  if (max === 0) {
    // for the first item
    newState = [{ _id: 0, ...data[0] }, ...newState];
  }
  for (let i = max; i < max + size; i++) {
    // sliding window
    if (data[i + 1]) newState.push({ _id: i + 1, ...data[i + 1] });
  }
  if (newState.length > 3 * size) {
    // cleaning the sliding window for performance adding max buffer of 3xSize
    // virtualization :)
    newState.splice(0, newState.length - 2 * size);
  }
  return newState;
};

export const getPrevArray = ({ size = 10, current = [], data }) => {
  // if first elements are same do nothing
  if (data[0] === current[0]) return current;

  // else proceed
  let newState = [];
  const min = current[0]._id > 10 ? current[0]._id - 10 : 0;
  for (let i = current[0]._id; i > min; i--) {
    // sliding window
    if (data[i - 1]) newState.unshift({ _id: i - 1, ...data[i - 1] });
  }
  newState = [...newState, ...current];
  if (newState.length > 3 * size) {
    // cleaning up with window size for better performance
    newState = newState.slice(0, 2 * size);
  }
  return [...newState];
};
const Table = ({ data = [], columns = [] }) => {
  const [current, set] = useState([]);
  useEffect(() => {
    set(getArray({ size: 30, current: [], data }));
  }, []);
  const onScroll = e => {
    window.ee = { ...e };
    let o = e.target;
    if (o.scrollTop === 0) {
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
      console.log("bottom");
      set(getArray({ size: 30, current, data }));
    }
  };
  return (
    <div className="App">
      <table style={{ tableLayout: "fixed" }}>
        {renderColGroups(columns)}
        <thead>
          <tr className="table-row">{renderColumns(columns)}</tr>
        </thead>
        <tbody className="c-container" onScroll={onScroll}>
          {current.map((i, ri) => (
            <Li key={i.id} {...{ i, ri, columns }} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
