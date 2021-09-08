import continents from './preval/continents'

export type Continent = {
  name: string
  countries: string[]
}

export default continents as Record<string, Continent>
