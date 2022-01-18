import './styles.css'
import * as d3 from 'd3'
//  import {geoMercator} from 'd3-geo-projection'

document.getElementById('app').innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`

const width = 960
const height = 500

const projection = d3.geoMercator()

const path = d3.geoPath().projection(projection)

const svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('border', '1px solid green')

// var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
const url = require('url:./assets/world-110m.geojson')
// var url = require("url:./assets/annotatedData.geojson");
const url2 =
  // "http://enjalot.github.io/wwsd/data/world/ne_50m_populated_places_simple.geojson";
  d3.json(url, function (error, countries) {
    // d3.json(url2, function (error, places) {
    if (error) console.log(error)

    // console.log("geojson", countries, places);
    console.log('geojson', countries)

    svg
      .selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', path)
      .on('mouseover', function (d) {
        console.log('just had a mouseover', d3.select(d))
        d3.select(this).classed('active', true)
      })
      .on('mouseout', function (d) {
        d3.select(this).classed('active', false)
      })

    // svg
    //   .selectAll("circle")
    //   .data(places.features)
    //   .enter()
    //   .append("circle")
    //   .attr("r", 5)
    //   .attr("cx", function (d) {
    //     return projection(d.geometry.coordinates)[0];
    //   })
    //   .attr("cy", function (d) {
    //     return projection(d.geometry.coordinates)[1];
    //   })
    //   .on("mouseover", function (d) {
    //     console.log("just had a mouseover", d3.select(d));
    //     d3.select(this).classed("active", true);
    //   })
    //   .on("mouseout", function (d) {
    //     d3.select(this).classed("active", false);
    //   });
    // });
  })

console.log('Hello world!')
