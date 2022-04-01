// @preval
const geodata = require('./geodata')

module.exports = geodata.features.reduce(
  (acc, { properties: { blocks, id } }) => {
    blocks.forEach(({ id: blockId, name }) => {
      acc[blockId] ??= { name, countries: [] }
      acc[blockId].countries.push(id)
    })
    return acc
  },
  {},
)
