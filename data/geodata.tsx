import type {
  Feature,
  FeatureCollection,
} from '@amcharts/amcharts4-geodata/.internal/Geodata'
import geodata from './preval/geodata'

export type CountryData = {
  name: string
  id: string
  area: number
  continentId: string
  continentName: string
  flag: string
}

export interface CountryFeature extends Feature {
  properties: CountryData
}

export interface Geodata extends FeatureCollection {
  features: CountryFeature[]
}

export default geodata as Geodata
