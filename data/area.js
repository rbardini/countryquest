// @preval
const geodata = require("./geodata");

module.exports = geodata.features.reduce(
  (acc, { properties: { area } }) => acc + area,
  0
);
