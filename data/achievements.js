import area from './area'
import continents from './continents'
import geodata from './geodata'
import population from './population'

const countryCount = geodata.features.length
const continentCount = Object.keys(continents).length

export default [
  {
    name: 'Travelling Salesman',
    description: `Visit all countries`,
    min: 0,
    max: countryCount,
    value: data => data.length,
    formatValue: value => value,
  },
  {
    name: 'Seven Corners',
    description: `Visit all continents`,
    min: 0,
    max: continentCount,
    value: data => new Set(data.map(({ continentId }) => continentId)).size,
    formatValue: value => value,
  },
  {
    name: 'Land Surveyor',
    description: "Visit the entire world's land surface",
    min: 0,
    max: area,
    value: data => data.reduce((acc, { area }) => acc + area, 0),
    formatValue: value =>
      (value / 1000 ** 2).toLocaleString('en', {
        notation: 'compact',
      }),
    unit: 'km²',
  },
  {
    name: 'Popular Demand',
    description: "Visit everyone's home country",
    min: 0,
    max: population,
    value: data => data.reduce((acc, { population }) => acc + population, 0),
    formatValue: value => value.toLocaleString('en', { notation: 'compact' }),
  },
  {
    name: 'New World',
    description: 'Visit all countries in the Americas',
    min: 0,
    max: continents.NA.countries.length + continents.SA.countries.length,
    value: data =>
      data.filter(
        ({ id }) =>
          continents.NA.countries.includes(id) ||
          continents.SA.countries.includes(id),
      ).length,
    formatValue: value => value,
  },
  {
    name: 'Ice Wall',
    description: `Visit Antarctica`,
    min: 0,
    max: 1,
    value: data => +data.some(({ continentId }) => continentId === 'AN'),
    formatValue: value => value,
  },
]
