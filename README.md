# My League App

A simple RESTfull app built using React and Bootstrap

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>

## Table of Contents

*   [Prerequisites](#Prerequisites)
*   [Available Scripts](#available-scripts)
    *   [npm start](#npm-start)
    *   [npm test](#npm-test)
    *   [npm run build](#npm-run-build)
    *   [npm run serve](#npm-run-serve)
*   [Deployment](#deployment)
    *   [Static Server](#static-server)

## Prerequisites

*   Have [node.js](https://nodejs.org/en/) 6+ and NPM installed
*   Clone repository https://github.com/ZPaulo/LeagueExercise.git
*   Navigate into project and do npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
No tests were created for this project. However, the project is configured to implement and run tests on it's components.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

See the section about [deployment](#deployment) for more information.

### `npm run serve`

Runs the app from a static server

## Deployment

`npm run build` creates a `build` directory with a production build of the app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

### Static Server

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```

The last command shown above will serve the app on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.
