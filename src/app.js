import * as d3 from 'd3'
// import * as L from 'leaflet'

import { buildD3Svg, buildLeafletMap, addLegendEventListeners } from './utils'
import './styles.css'

document.getElementById('app').innerHTML = `
  <h1>Technical Evaluation</h1>
  <div>
    Mapping solution using <strong>GeoJSON</strong>, <strong>D3.js</strong>, <strong>Leaflet.js</strong>, and good old-fashioned <strong>JavaScript</strong>, <strong>CSS</strong>, and <strong>DOM</strong> manipulation.
  </div><br />
`

const width = 960
const height = 680

/* eslint-disable import/no-unresolved */
const url = require('url:./assets/annotatedData.geojson')

d3.json(url, (error, regions) => {
  if (error) console.log(error)

  // *****************************
  // MAP #1 - D3, GeoJSON
  // *****************************
  buildD3Svg(regions, width, height)

  // *****************************
  // MAP #2 - Leaflet, D3, GeoJSON
  // *****************************
  // buildLeafletMap(regions)
  const { map, mapLayer } = buildLeafletMap(regions)

  // *****************************
  // add EventListeners
  // *****************************
  addLegendEventListeners(map, mapLayer)
})
