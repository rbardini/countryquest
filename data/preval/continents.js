// @preval
const geodata = require('./geodata')

module.exports = geodata.features.reduce(
  (
    acc,
    {
      properties: {
        continent: { id: continentId, name },
        id,
      },
    },
  ) => {
    acc[continentId] ??= { name, countries: [] }
    acc[continentId].countries.push(id)
    return acc
  },
  {},
)
