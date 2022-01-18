import * as d3 from 'd3'
import * as L from 'leaflet'

export const buildD3Svg = (regions, width, height) => {
  const svg = d3
    // .select("body")
    .select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid #ccc')

  const projection = d3.geoMercator()
  projection.fitExtent(
    [
      [0, 0],
      [width, height],
    ],
    regions
  )
  console.log('projection', projection([-76.958104, 38.854865]))

  const path = d3.geoPath().projection(projection)

  console.log('geojson', regions)

  svg
    .selectAll('path')
    .append('path')
    .data(regions.features)
    .enter()
    .append('path')
    .attr('d', path)
    .on('mouseover', function (d) {
      console.log('d3 mouseover', d)
      d3.select(this).classed('active', true)
    })
    .on('mouseout', function (d) {
      console.log('d3 mouseout', d)
      d3.select(this).classed('active', false)
    })
}

const getTableStats = (layer) => {
  const check = [
    document.getElementById('check1'),
    document.getElementById('check2'),
    document.getElementById('check3'),
    document.getElementById('check4'),
    document.getElementById('check5'),
  ]
  const count = [0, 0, 0, 0, 0]

  let result1 = `
    <div class="tooltip-body">
    <h3>${layer.feature.properties.label_name}</h3>
    <p>Impaired car crashes by year</p>
    <table>
      <thead>
        <th>YEAR</th>
        <th>COUNT</th>
      </thead>
      <tbody>`
  if (check[0].checked) {
    count[0] = layer.feature.properties['2010'] || 0
    result1 += `
        <tr>
          <th>2010</th>
          <td>${count[0]}</td>
        </tr>`
  }
  if (check[1].checked) {
    count[1] = layer.feature.properties['2011'] || 0
    result1 += `
        <tr>
          <th>2011</th>
          <td>${count[1]}</td>
        </tr>`
  }
  if (check[2].checked) {
    count[2] = layer.feature.properties['2012'] || 0
    result1 += `
        <tr>
          <th>2012</th>
          <td>${count[2]}</td>
        </tr>`
  }
  if (check[3].checked) {
    count[3] = layer.feature.properties['2013'] || 0
    result1 += `
        <tr>
          <th>2013</th>
          <td>${count[3]}</td>
        </tr>`
  }
  if (check[4].checked) {
    count[4] = layer.feature.properties['2014'] || 0
    result1 += `
        <tr>
          <th>2014</th>
          <td>${count[4]}</td>
        </tr>`
  }
  result1 += `
        <tr>
          <th>TOTAL</th>
          <td>${d3.sum(count) || 0}</td>
        </tr>
      </tbody>
    </table>
    </div>
    `

  return result1
}

export const buildLeafletMap = (regions, width, height) => {
  const mapContainer = document.getElementById('map')
  mapContainer.style.width = width
  mapContainer.style.height = height

  // init map container; set view and zoom
  const map = L.map(mapContainer).setView([38.9065, -77.012], 12)

  //  visual map

  const mapLayer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 15,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  ).addTo(map)

  console.log('mapLayer', mapLayer)

  // const fillColor = '#432'
  const fillColor = '#333'
  const hoverFill = '#f00'
  const outline = '#fff'
  const outlineHover = '#fff'

  // L.svg({ clickable: true }).addTo(map) // we have to make the svg layer clickable

  // initialize svg to add to map
  const WashingtonDCLayer = L.geoJSON(regions, {
    weight: 2,
    color: outline,
    // color: '#F00',
    fillColor,
  })
    .bindTooltip((layer) => {
      // layer.
      return getTableStats(layer)
    })
    .on('mouseover', (e) => {
      // console.log('leaflet e', e)
      e.propagatedFrom.setStyle({ color: outlineHover, fillColor: hoverFill })
    })
    .on('mouseout', (e) => {
      // console.log('leaflet e', e)
      e.propagatedFrom.setStyle({ color: outline, fillColor })
    })
    .addTo(map)

  // fit bounds of polygon and get map view to fit (thank God for this method!)
  map.fitBounds(WashingtonDCLayer.getBounds())
  console.log('regions.getBounds()', WashingtonDCLayer.getBounds())
  return {
    map,
    mapLayer,
  }
}
