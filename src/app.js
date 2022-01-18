import * as d3 from 'd3'
import * as L from 'leaflet'

import { buildD3Svg, buildLeafletMap } from './utils'
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
  // MAP #1
  // *****************************
  buildD3Svg(regions, width, height)

  // *****************************
  // MAP #2
  // *****************************
  // buildLeafletMap(regions)
  const { map, mapLayer } = buildLeafletMap(regions)
  let tempMapLayer = mapLayer

  // const changeMapBtn = document.getElementById('changeMap')
  // changeMapBtn.addEventListener('click', (e) => {
  //   // const map = L.tileLayer('map')
  //   L.tileLayer(
  //     'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
  //     {
  //       maxZoom: 15,
  //       attribution:
  //         '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  //     }
  //   ).addTo(map)
  // })
  const radioHTMLCol = document.getElementsByName('mapType')
  const radioArr = [...radioHTMLCol]
  radioArr.forEach((item) => {
    item.addEventListener('change', (e) => {
      switch (parseInt(+e.target.value, 10)) {
        case 1:
          map.removeLayer(tempMapLayer)
          tempMapLayer = L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
              maxZoom: 15,
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }
          ).addTo(map)
          break
        case 2:
          map.removeLayer(tempMapLayer)
          tempMapLayer = L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
            {
              maxZoom: 15,
              attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            }
          ).addTo(map)
          break
        case 3:
          map.removeLayer(tempMapLayer)
          tempMapLayer = L.tileLayer(
            'https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png',
            {
              maxZoom: 20,
              attribution:
                '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            }
          ).addTo(map)
          break
        case 4:
          map.removeLayer(tempMapLayer)
          tempMapLayer = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
              attribution:
                'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            }
          ).addTo(map)
          break
        case 5:
          map.removeLayer(tempMapLayer)
          tempMapLayer = L.tileLayer(
            'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
            {
              attribution:
                'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              subdomains: 'abcd',
              minZoom: 0,
              maxZoom: 18,
              ext: 'png',
            }
          ).addTo(map)
          break
        default:
      }
    })
  })

  console.log(`radioHTMLCol`, radioHTMLCol)
  console.log(`radioArr`, radioArr)
})
