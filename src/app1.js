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
const url = require('url:./assets/annotatedData.geojson')
// var url = require("url:./assets/world-110m.geojson");
const width = 960
const height = 500
// var width = 480,
//   height = 250;

// var projection = d3.geoMercator()
// projection.fitExtent([[0, 0], [width, height]], url)
// .scale([300])
// .fitExtent([0, 0, width, height], JSON.parse(url));
// var projection = d3.geoIdentity()
//   .reflectY(true)
//   .fitWidth(width, url);

// console.log(`projection`, projection([-76.958104, 38.854865]))
// var path = d3.geoPath().projection(projection);

const svg = d3
  .select('#chart')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('border', '1px solid green')

// var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
// var url = require("url:./assets/world-110m.geojson");
// var url = require("url:./assets/annotatedData.geojson");

d3.json(url, function (error, countries) {
  const projection = d3.geoMercator()
  projection.fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    countries
  )
  console.log(`projection`, projection([-76.958104, 38.854865]))
  const path = d3.geoPath().projection(projection)

  // d3.json(url2, function (error, places) {
  if (error) console.log(error)

  // console.log("geojson", countries, places);
  console.log('geojson', countries)

  svg
    .selectAll('path')
    .append('path')
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

d3.select('body')
  .selectAll('p')
  .data([4, 8, 15, 16, 23, 42])
  .enter()
  .append('p')
  .text(function (d) {
    return `I’m number ${d}!`
  })

// d3.selectAll("p").style("color", "blue");

d3.selectAll('p').style('color', function () {
  return `hsl(${Math.random() * 360},100%,50%)`
})

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
