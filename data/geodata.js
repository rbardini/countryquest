// @preval
const worldLowGeodata = require("@amcharts/amcharts4-geodata/json/worldLow.json");
const countries2 = require("@amcharts/amcharts4-geodata/json/data/countries2.json");
const geojsonArea = require("@mapbox/geojson-area");
const restcountries = require("./restcountries.json");

const UM_ID = "UM";

// Partition U.S. Minor Outlying Islands and rest of countries
const [ums, rest] = worldLowGeodata.features.reduce(
  (acc, feature) => acc[+!feature.id.startsWith(UM_ID)].push(feature) && acc,
  [[], []]
);

// Merge all U.S. Minor Outlying Islands into one
const um = {
  type: "Feature",
  geometry: {
    type: "MultiPolygon",
    coordinates: ums.map(({ geometry }) => geometry.coordinates),
  },
  properties: { name: countries2[UM_ID].country, id: UM_ID },
  id: UM_ID,
};

module.exports = {
  ...worldLowGeodata,
  // Omit countries without data and add merged U.S. Minor Outlying Islands
  features: [...rest.filter(({ id }) => countries2[id]), um]
    .map(
      // Add continent and population information
      (feature) => {
        const {
          continent: continentName,
          continent_code: continentId,
        } = countries2[feature.id];

        const { population } = restcountries[feature.id];

        return {
          ...feature,
          properties: {
            ...feature.properties,
            area: geojsonArea.geometry(feature.geometry),
            continentId,
            continentName,
            population,
          },
        };
      }
    )
    .sort((a, b) => a.properties.name.localeCompare(b.properties.name)),
};
