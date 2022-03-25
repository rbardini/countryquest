import type { Geometry } from 'geojson'
import geodata from './preval/geodata'

export type CountryData = {
  name: string
  id: string
  area: number
  continentId: string
  continentName: string
  flag: string
}

export type Geodata = GeoJSON.FeatureCollection<Geometry, CountryData>

export default geodata as Geodata
