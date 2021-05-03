// @preval
const geodata = require("./geodata");

module.exports = geodata.features.reduce(
  (acc, { properties: { continentId, continentName, id } }) => {
    acc[continentId] ??= { name: continentName, countries: [] };
    acc[continentId].countries.push(id);
    return acc;
  },
  {}
);
