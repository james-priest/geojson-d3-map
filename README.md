[![Netlify Status](https://api.netlify.com/api/v1/badges/22a11bde-3fd9-43c3-86df-d1eaf6b03d99/deploy-status)](https://app.netlify.com/sites/geojson-d3-map/deploys)

**Live Demo:** [https://geojson-d3-map.netlify.app/](https://geojson-d3-map.netlify.app/)

# GeoJSON D3 Map

This was a technical evaluation given as a take-home coding assignment. The instructions were as follows:

*Attached is a geojson file. You may reformat/adjust this file as you see fit for the purposes of this project. This file represents impaired car crashes by neighborhood in the Washington, D.C. area over a five year period (2010-2014). Please use the data in this file to create a single page, coherent representation of the data that users can use to understand various angles/depth of the information provided.*

- *Use at least two types of visualization, one of which must be geo-based*
- *Use the D3.js library for at least one of the visualizations*
- *Provide interactivity between visualizations as well as user interactivity points*
- *Provide at least one interaction that allows users to limit/filter/search data*
- *You may use any third-party libraries you see fit in addition to D3*
- *Responsive design / mobile compatibility is optional*

## Project Features

This project was researched over a weekend and completed in a couple days. It employs the following:

- GeoJSON
- D3.js
- Leaflet.js
- JavaScript
- CSS
- DOM manipulation

## Installation

Clone the repository.

```bs
git clone https://github.com/james-priest/geojson-d3-map.git
cd geojson-d3-map
```

Use yarn or npm to install dependencies.

```sh
yarn

# or

npm install
```

## Usage

### Development mode

- Starts a dev server.
- Bundles but does not optimize or minify.
- Launches website at [http://localhost:1234/](http://localhost:1234/).

```sh
yarn start

# or

npm run start
```

### Production mode

- Will build once (No watch mode or hot module replacement).
- Minifies html, js, css, and optimizes image resources.
- Outputs to `dist/`.

```sh
yarn build

# or

npm run build
```

In order to view the production version a local http server needs to be used to launch `dist/index.html` .

Here are two links showing how to spin up a local http server.

- [Simple HTTP Server](http://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server) - Runs on Node.js.
- [How to run things locally](https://threejs.org/docs/#manual/en/introduction/How-to-run-things-locally) - Instructions for Node.js, Python, & Ruby.

Alternatively, a Visual Studio Code extension can be used to run the site from within the VSCode dev environment.

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) - Launch a development local Server with live reload feature for static & dynamic pages.

## Development Process

Here are some questions and answers regarding this project.

1. short description indicating thought process
2. what was done and what wasn't done
3. things to improve if there wer all the time in the world
4. issues with the implementation
5. rough estimate of time spent on the project
