import * as d3 from 'd3'
import * as L from 'leaflet'

export const buildD3Svg = (countries, width, height) => {
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
    countries
  )
  console.log('projection', projection([-76.958104, 38.854865]))

  const path = d3.geoPath().projection(projection)

  console.log('geojson', countries)

  svg
    .selectAll('path')
    .append('path')
    .data(countries.features)
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
  const result1 = `
    <div class="tooltip-body">
    <h3>${layer.feature.properties.label_name}</h3>
    <p>Impaired car crashes by year</p>
    <table>
      <thead>
        <th>YEAR</th>
        <th>COUNT</th>
      </thead>
      <tbody>
        <tr>
          <th>2010</th>
          <td>${layer.feature.properties['2010'] || 0}</td>
        </tr>
        <tr>
          <th>2011</th>
          <td>${layer.feature.properties['2011'] || 0}</td>
        </tr>
        <tr>
          <th>2012</th>
          <td>${layer.feature.properties['2012'] || 0}</td>
        </tr>
        <tr>
          <th>2013</th>
          <td>${layer.feature.properties['2013'] || 0}</td>
        </tr>
        <tr class="border-bottom">
          <th class="border-bottom">2014</th>
          <td class="border-bottom">${
            layer.feature.properties['2014'] || 0
          }</td>
        </tr>
        <tr>
          <th>TOTAL</th>
          <td>${layer.feature.properties.total || 0}</td>
        </tr>
      </tbody>
    </table>
    </div>
    `
  // const result2 = `
  //   <h3>${layer.feature.properties.label_name}</h3>
  //   <p>Number of impaired car crashed by year</p>
  //   <table class="tooltip-table">
  //     <thead>
  //         <th>2010</th>
  //         <th>2011</th>
  //         <th>2012</th>
  //         <th>2013</th>
  //         <th>2014</th>
  //         <th>total</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       <tr>
  //         <td>${layer.feature.properties['2010'] || 0}</td>
  //         <td>${layer.feature.properties['2011'] || 0}</td>
  //         <td>${layer.feature.properties['2012'] || 0}</td>
  //         <td>${layer.feature.properties['2013'] || 0}</td>
  //         <td>${layer.feature.properties['2014'] || 0}</td>
  //         <td>${layer.feature.properties.total || 0}</td>
  //       </tr>
  //     </tbody>
  //   </table>
  //   `
  return result1
}

export const buildLeafletMap = (countries, width, height) => {
  const mapContainer = document.getElementById('map')
  mapContainer.style.width = width
  mapContainer.style.height = height

  // init map container; set view and zoom
  const map = L.map(mapContainer).setView([38.9065, -77.012], 12)

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

  // const fillColor = '#432'
  const fillColor = '#666'
  const hoverFill = '#f00'
  const outline = '#eee'
  const outlineHover = '#eee'

  // L.svg({ clickable: true }).addTo(map) // we have to make the svg layer clickable

  // initialize svg to add to map
  const WashingtonDCLayer = L.geoJSON(countries, {
    weight: 1,
    color: outline,
    // color: '#F00',
    fillColor,
  })
    .bindTooltip((layer) => getTableStats(layer))
    .on('mouseover', (e) => {
      console.log('leaflet e', e)
      e.propagatedFrom.setStyle({ color: outlineHover, fillColor: hoverFill })
    })
    .on('mouseout', (e) => {
      console.log('leaflet e', e)
      e.propagatedFrom.setStyle({ color: outline, fillColor })
    })
    .addTo(map)

  // fit bounds of polygon and get map view to fit (thank God for this method!)
  map.fitBounds(WashingtonDCLayer.getBounds())
  console.log('countries.getBounds()', WashingtonDCLayer.getBounds())
}
