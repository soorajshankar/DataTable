import React from "react";
const getData = size => {
  let data = [];
  for (let i = 0; i <= size; i++) {
    data.push({ id: i, name: `${i} Guy` });
  }
  return data;
};

export default getData;
export const columns = [
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
/**
 * albumId: 1
 * id: 1
 * thumbnailUrl: "https://via.placeholder.com/150/92c952"
 * title: "accusamus beatae ad facilis cum similique qui sunt"
 * url: "https://via.placeholder.com/600/92c952"
 */
export const albumColumns = [
  {
    label: "Album Id",
    id: "albumId",
    width: "100px",
    numeric: true
  },
  {
    label: "Title",
    id: "title",
    numeric: false
  },
  {
    label: "Art",
    renderer: val => <img src={val} />,
    id: "thumbnailUrl",
  }
];
