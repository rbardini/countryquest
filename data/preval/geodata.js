// @preval
const worldLowGeodata = require('@amcharts/amcharts5-geodata/json/worldLow.json')
const countries2 = require('@amcharts/amcharts5-geodata/json/data/countries2.json')
const { isEuMember } = require('is-eu-member')
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
        const blocks = [
          isEuMember(feature.id) && { id: 'EU', name: 'European Union' },
        ].filter(Boolean)
        const { continent: continentName, continent_code: continentId } =
          countries2[feature.id]
        const continent = { id: continentId, name: continentName }
        const { area, flag, landlocked, population } = restcountries[feature.id]

        return {
          ...feature,
          properties: {
            ...feature.properties,
            area,
            blocks,
            continent,
            flag,
            landlocked,
            population,
          },
        }
      },
    )
    .sort((a, b) => a.properties.name.localeCompare(b.properties.name)),
}
