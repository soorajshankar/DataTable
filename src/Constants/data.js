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
