// @preval
const geodata = require('./geodata')

module.exports = geodata.features.reduce(
  (acc, { properties: { landlocked } }) => acc + +landlocked,
  0,
)
