import React, { useState, useEffect } from "react";

export const Li = ({ i, ri, columns, onChange, selectedItems }) => {
  columns = [{ label: "_checkbox" }, ...columns];
  console.log(selectedItems, selectedItems.has(i._id), i._id);
  return (
    <tr>
      {columns.map((c, ci) => {
        const renderer =
          c.label === "_checkbox" ? (
            <input
              type="checkbox"
              onChange={e => onChange(i, e.target.checked, selectedItems)}
              checked={selectedItems.has(i._id)}
            />
          ) : (
            i[c.id]
          ); // (React.ReactNode | string | number),

        return (
          <td
            key={`${ci}-${ri}`}
            // className="c-child child "
            {...{
              ...(c.numeric && { align: "right" })
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
  columns = [{ label: "_checkbox", width: "20px" }, ...columns];
  return columns.map(({ label = "", numeric = false, width }, ci) => {
    const renderer = label === "_checkbox" ? <input type="checkbox" /> : label;
    return (
      <th
        key={ci}
        // className="c-child child "
        {...{
          ...(numeric && { align: "right" })
        }}
      >
        {renderer}
      </th>
    );
  });
};
export const renderColGroups = columns => {
  columns = [{ label: "_checkbox", width: "20px" }, ...columns];
  return (
    <colgroup>
      {columns.map(({ label = "", numeric = false, width = "10%" }, ci) => {
        return (
          <col
            //
            style={{
              backgroundColor: "yellow",
              width: width,
              minWidth: width
            }}
          ></col>
        );
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
const Table = ({
  data = [],
  columns = [],
  maxHeight = 250,
  onSelectionChange = items => console.log(items)
}) => {
  const [current, set] = useState([]);
  const [selectedItems, setSelectedItems] = useState();
  useEffect(() => {
    set(getArray({ size: 30, current: [], data }));
    setSelectedItems(new Set());
  }, []);
  const onChange = ({ _id }, checked, selectedItems) => {
    // todo
    const newSelectedItems = new Set(selectedItems);
    checked ? newSelectedItems.add(_id) : newSelectedItems.delete(_id);
    setSelectedItems(newSelectedItems);
    onSelectionChange(newSelectedItems);
  };
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
    <div className="vir-table">
      <div className="vir-table-header">
        <table>
          {renderColGroups(columns)}
          <thead>{renderColumns(columns)}</thead>
        </table>
      </div>
      <div
        style={{ maxHeight, overflow: "auto" }}
        className="vir-table-body"
        onScroll={onScroll}
      >
        <table>
          {renderColGroups(columns)}
          {/* {renderColGroups(columns)} */}
          <tbody>
            {current.map((i, ri) => (
              <Li key={i.id} {...{ i, ri, columns, onChange, selectedItems }} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
