import worldLowGeodata from "@amcharts/amcharts4-geodata/worldLow";
import countriesData from "@amcharts/amcharts4-geodata/data/countries2";
import geojsonArea from "@mapbox/geojson-area";

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
  properties: { name: countriesData[UM_ID].country, id: UM_ID },
  id: UM_ID,
};

const geodata = {
  ...worldLowGeodata,
  // Omit countries without data and add merged U.S. Minor Outlying Islands
  features: [...rest.filter(({ id }) => countriesData[id]), um].map(
    // Add continent information
    (feature) => {
      const {
        continent: continentName,
        continent_code: continentId,
      } = countriesData[feature.id];

      return {
        ...feature,
        properties: {
          ...feature.properties,
          area: geojsonArea.geometry(feature.geometry),
          continentId,
          continentName,
        },
      };
    }
  ),
};

export default geodata;
