export default function tableStats(layer) {
  const result1 = `
    <div class="tooltip-body">
    <h3>${layer.feature.properties.label_name}</h3>
    <p>Impaired car crashed by year</p>
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
  const result2 = `
    <h3>${layer.feature.properties.label_name}</h3>
    <p>Number of impaired car crashed by year</p>
    <table class="tooltip-table">
      <thead>
          <th>2010</th>
          <th>2011</th>
          <th>2012</th>
          <th>2013</th>
          <th>2014</th>
          <th>total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${layer.feature.properties['2010'] || 0}</td>
          <td>${layer.feature.properties['2011'] || 0}</td>
          <td>${layer.feature.properties['2012'] || 0}</td>
          <td>${layer.feature.properties['2013'] || 0}</td>
          <td>${layer.feature.properties['2014'] || 0}</td>
          <td>${layer.feature.properties.total || 0}</td>
        </tr>
      </tbody>
    </table>
    `

  return result1
}
