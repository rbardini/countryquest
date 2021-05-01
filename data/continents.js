// @preval
const geodata = require("./geodata");

module.exports = geodata.features.reduce(
  (acc, { properties: { continentId, continentName } }) =>
    (acc[continentId] = continentName) && acc,
  {}
);
