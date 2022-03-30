// @preval
const worldLowGeodata = require('@amcharts/amcharts5-geodata/json/worldLow.json')
const countries2 = require('@amcharts/amcharts5-geodata/json/data/countries2.json')
const geojsonArea = require('@mapbox/geojson-area')
const { countryCodeEmoji } = require('country-code-emoji')
const restcountries = require('./json/restcountries.json')

const UM_ID = 'UM'

// Partition U.S. Minor Outlying Islands and rest of countries
const [ums, rest] = worldLowGeodata.features.reduce(
  (acc, feature) => acc[+!feature.id.startsWith(UM_ID)].push(feature) && acc,
  [[], []],
)

// Merge all U.S. Minor Outlying Islands into one
const um = {
  type: 'Feature',
  geometry: {
    type: 'MultiPolygon',
    coordinates: ums.map(({ geometry }) => geometry.coordinates),
  },
  properties: { name: countries2[UM_ID].country, id: UM_ID },
  id: UM_ID,
}

module.exports = {
  ...worldLowGeodata,
  // Omit countries without data and add merged U.S. Minor Outlying Islands
  features: [...rest.filter(({ id }) => countries2[id]), um]
    .map(
      // Add extra information
      feature => {
        const area = geojsonArea.geometry(feature.geometry)
        const { continent: continentName, continent_code: continentId } =
          countries2[feature.id]
        const flag = countryCodeEmoji(feature.id)
        const { landlocked, population } = restcountries[feature.id]

        return {
          ...feature,
          properties: {
            ...feature.properties,
            area,
            continentId,
            continentName,
            flag,
            landlocked,
            population,
          },
        }
      },
    )
    .sort((a, b) => a.properties.name.localeCompare(b.properties.name)),
}
