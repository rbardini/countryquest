import area from '../data/area'
import blocks from '../data/blocks'
import continents from '../data/continents'
import type { CountryData } from '../data/geodata'
import geodata from '../data/geodata'
import landlocked from '../data/landlocked'
import lines from '../data/lines'
import population from '../data/population'

export type Achievement = {
  name: string
  description: string
  min: number
  max: number
  value: (data: CountryData[]) => number
  formatValue: (number: number) => string | number
  unit?: string
}

const achievements: Achievement[] = [
  {
    name: 'Travelling Salesman',
    description: `Visit all countries`,
    min: 0,
    max: geodata.features.length,
    value: data => data.length,
    formatValue: value => value,
  },
  {
    name: 'Seven Corners',
    description: `Visit all continents`,
    min: 0,
    max: Object.keys(continents).length,
    value: data => new Set(data.map(({ continent: { id } }) => id)).size,
    formatValue: value => value,
  },
  {
    name: 'Land Surveyor',
    description: "Visit the entire world's land surface",
    min: 0,
    max: area,
    value: data => data.reduce((acc, { area }) => acc + area, 0),
    formatValue: value => value.toLocaleString('en', { notation: 'compact' }),
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
    name: 'Old World',
    description: 'Visit all countries in Africa, Europe and Asia',
    min: 0,
    max:
      continents.AF.countries.length +
      continents.EU.countries.length +
      continents.AS.countries.length,
    value: data =>
      data.filter(
        ({ id }) =>
          continents.AF.countries.includes(id) ||
          continents.EU.countries.includes(id) ||
          continents.AS.countries.includes(id),
      ).length,
    formatValue: value => value,
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
    name: 'Maastricht Treaty',
    description: 'Visit all member states of the European Union',
    min: 0,
    max: blocks.EU.countries.length,
    value: data =>
      data.filter(({ id }) => blocks.EU.countries.includes(id)).length,
    formatValue: value => value,
  },
  {
    name: 'The Belt',
    description: 'Visit all countries crossed by the equatorial line',
    min: 0,
    max: lines.EQ.countries.length,
    value: data =>
      data.filter(({ id }) => lines.EQ.countries.includes(id)).length,
    formatValue: value => value,
  },
  {
    name: 'Landlocked',
    description: 'Visit all countries with no direct access to the sea',
    min: 0,
    max: landlocked,
    value: data => data.reduce((acc, { landlocked }) => acc + +landlocked, 0),
    formatValue: value => value,
  },
  {
    name: 'Ice Wall',
    description: `Visit Antarctica`,
    min: 0,
    max: 1,
    value: data => +data.some(({ continent: { id } }) => id === 'AN'),
    formatValue: value => value,
  },
]

export default achievements
