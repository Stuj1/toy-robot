# Toy Robot Game
A simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

## Demo
See a live demo: https://dancing-biscochitos-e87198.netlify.app/

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites
- Node.js
- npm or yarn


## Installing
Clone the repository to your local machine

`git clone https://github.com/Stuj1/toy-robot.git`

## Install the dependencies

### `npm install`
or
### `yarn`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.



## Built With
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- Node.js: JavaScript runtime for building server-side applications
- TypeScript: A strict syntactical superset of JavaScript that adds optional static typing
- React: A JavaScript library for building user interfaces
- redux: A predictable state container for JavaScript apps
- react-redux-toolkit: A set of utilities that helps to simplify the usage of the redux library
- Testing Library (react): A set of tools to test the behavior of React components
- Sass: CSS preprocessor that helps you write efficient and maintainable stylesheets.

## Authors
Stuart Jennings - Initial work - https://github.com/Stuj1

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

## Usage

### Using the controls
Use the control buttons to send direct commands to the robot.
For placement of robot and walls you can specify the coordinates (row, col) and facing direction.
Click report to show the robot's current position and direction.

### Using the Sequence commands
Specify a sequence of commands, on separate lines. These will run in order with a 1 second delay.
The following commands are acceptable: 

- PLACE_ROBOT ROW,COL,FACING - place the robot on the table in position ROW,COL and facing NORTH, SOUTH, EAST or WEST
- PLACE_WALL ROW,COL - place a wall on the table in position ROW,COL
- MOVE - move the robot one unit forward in the direction it is currently facing
- LEFT - rotate the robot 90 degrees counter-clockwise
- RIGHT - rotate the robot 90 degrees clockwise
- REPORT - announce the row, column and direction of the robot


## Follow up tasks:

- Better timer handling - Cancel timers on reset, probably better to use redux state for this.
- More validation - e.g. maximum number of commands in sequence
- General tidy up - this was put together very quickly! I'd love a bit more time to make sure everything is where it should be.
- The focus in this project was not on styling. It needs tidying up - there is a mix of sass, css modules and css-in-js! This is just a hangup from the CRA template and adding things in quickly.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
