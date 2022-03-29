// @preval
const { getEuMembers } = require('is-eu-member')

module.exports = {
  EU: {
    name: 'European Union',
    countries: getEuMembers(),
  },
}
