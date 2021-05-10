// @preval
const geodata = require("./geodata");

module.exports = geodata.features.reduce(
  (acc, { properties: { population } }) => acc + population,
  0
);
