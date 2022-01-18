import * as d3 from 'd3'
import * as L from 'leaflet'

import tableStats from './utils'
import './styles.css'

document.getElementById('app').innerHTML = `
<h1>Technical Evaluation</h1>
<div>
  Mapping solution using <strong>GeoJSON</strong>, <strong>D3.js</strong>, <strong>Leaflet.js</strong>, and good old-fashioned <strong>JavaScript</strong>, <strong>CSS</strong>, and <strong>DOM</strong> manipulation.
</div><br />
`

const width = 960
const height = 680

// var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
// var url = require("url:./assets/world-110m.geojson");
// var url = require("url:./assets/annotatedData.geojson");
/* eslint-disable import/no-unresolved */
const url = require('url:./assets/annotatedData.geojson')
// var url = require("url:./assets/world-110m.geojson");

d3.json(url, (error, countries) => {
  // MAP #1
  // init map and set view
  const map = L.map('map').setView([38.9065, -77.012], 12) // good layer
  // var map = L.map('map').setView([39.9065, -77.112], 12); // bad layer

  //  visual map
  const stadiaAlidadeSmooth = L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
    {
      maxZoom: 20,
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    }
  ).addTo(map)
  console.log('Stadia_AlidadeSmooth', stadiaAlidadeSmooth)

  const fillColor = '#000'
  const hoverFill = '#F00'

  L.svg({ clickable: true }).addTo(map) // we have to make the svg layer clickable
  // initialize svg to add to map
  const WashingtonDCLayer = L.geoJSON(countries, {
    weight: 2,
    // color: "#432"
    color: '#F00',
    fillColor,
  })
    .bindTooltip((layer) => tableStats(layer))
    .on('mouseover', (e) => {
      console.log('leaflet e', e)
      e.propagatedFrom.setStyle({ color: '#000', fillColor: hoverFill })
      // console.log("just had a mouseover", d3.select(d));
      // d3.select(this).classed("active", true);
    })
    .on('mouseout', (e) => {
      console.log('leaflet e', e)
      e.propagatedFrom.setStyle({ color: '#000', fillColor })
      // console.log("just had a mouseover", d3.select(d));
      // d3.select(this).classed("active", true);
    })
    .addTo(map)

  // fit bounds of polygon and get map view to fit (thank God for this method!)
  map.fitBounds(WashingtonDCLayer.getBounds())
  console.log('countries.getBounds()', WashingtonDCLayer.getBounds())

  // *****************************
  // MAP #2
  // *****************************
  const svg = d3
    // .select("body")
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid green')

  const projection = d3.geoMercator()
  projection.fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    countries
  )
  console.log('projection', projection([-76.958104, 38.854865]))

  const path = d3.geoPath().projection(projection)

  if (error) console.log(error)

  console.log('geojson', countries)

  svg
    .selectAll('path')
    .append('path')
    .data(countries.features)
    .enter()
    .append('path')
    .attr('d', path)
    .on('mouseover', function (d) {
      console.log('d3 d', d)
      // console.log("just had a mouseover", d3.select(d));
      d3.select(this).classed('active', true)
    })
    .on('mouseout', function (d) {
      d3.select(this).classed('active', false)
    })
})

// console.log('Hello world!');

// d3.select("body")
//   .selectAll("p")
//   .data([4, 8, 15, 16, 23, 42])
//   .enter().append("p")
//   .text(function(d) { return "I’m number " + d + "!"; });

// d3.selectAll("p").style("color", "blue");

// d3.selectAll("p").style("color", function() {
//   return "hsl(" + Math.random() * 360 + ",100%,50%)";
// });

// d3.selectAll("p").style("color", function(d, i) {
//   return i % 2 ? "#fff" : "#eee";
// });

// d3.selectAll("p")
// .data([4, 8, 15, 16, 23, 42])
//   .style("font-size", function(d) { return d + "px"; });

// d3.select("body")
//   .selectAll("p")
//   .data([4, 8, 15, 16, 23, 42])
//   .enter().append("p")
//   .text(function(d) { return "I'm number " + d + "!"; });

// // Update…
// var p = d3.select("body")
//   .selectAll("p")
//   .data([4, 8, 15, 16, 23, 42])
//   .text(function(d) { return d; });

// // Enter…
// p.enter().append("p")
//   .text(function(d) { return d; });

// // Exit…
// p.exit().remove();

// d3.select("body").transition()
//     .style("background-color", "black");
