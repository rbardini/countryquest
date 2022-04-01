import type { Geometry } from 'geojson'
import geodata from './preval/geodata'

export type Entity = {
  id: string
  name: string
}

export type CountryData = Entity & {
  area: number
  blocks: Entity[]
  continent: Entity
  flag: string
  landlocked: boolean
  population: number
}

export type Geodata = GeoJSON.FeatureCollection<Geometry, CountryData>

export default geodata as Geodata
