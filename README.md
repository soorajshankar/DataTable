# Data Table for ReactJS Applications
# demo : https://react-virtual-datatable.netlify.com/

Data table component for virtualised data table.

Usage

```JSX
<Table
  data={data}
  columns={columns}
  height="100px"
  onRowClick={item => {
    console.log(item);
  }}
  onSelectionChange={selection => {
    console.log(selection);
  }}
/>
```

## Properties

### data: data array for the data table

sample data

```javascript
const data = [
  {
    albumId: 1,
    id: 1,
    thumbnailUrl: "https://via.placeholder.com/150/92c952",
    title: "accusamus beatae ad facilis cum similique qui sunt",
    url: "https://via.placeholder.com/600/92c952"
  }
];
```

### columns: column definition in the form of object array

sample columns input

```javascript
export const column = [
  {
    label: "Album Id", // columns header
    id: "albumId", // id which is used as the cell renderer key
    width: "100px", // can have px/%/number/ undefined values
    numeric: true // this will make sure text is aligned right
  },
  {
    label: "Title",
    id: "title",
    numeric: false
  },
  {
    label: "Art",
    renderer: val => <img src={val} />,
    id: "thumbnailUrl"
  }
];
```

### onRowClick: on row click event

```javascript
onRowClick={item => {
    console.log(item);
  }}
```

### onSelectionChange: onSelectionChange event 

gives selection details as selected item keys or "All"

```javascript
onSelectionChange={selection => {
console.log(selection);
}}
```

## Build Pipeline 

CI is implemented with netlify CI, build pipeline runs test before each test and automatically give publish request in netlify portal.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
