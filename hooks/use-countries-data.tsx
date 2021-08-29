import type {
  Feature,
  FeatureCollection,
} from '@amcharts/amcharts4-geodata/.internal/Geodata'
import { useMemo } from 'react'
import geodata from '../data/geodata'

export type CountryData = {
  name: string
  id: string
  area: number
  continentId: string
  continentName: string
}

interface CountryFeature extends Feature {
  properties: CountryData
}

interface Geodata extends FeatureCollection {
  features: CountryFeature[]
}

export default function useCountriesData(countries: Set<string>) {
  return useMemo(
    () =>
      (geodata as Geodata).features.reduce<[CountryData[], CountryData[]]>(
        (acc, { id, properties }) => {
          acc[+!countries.has(id)].push(properties)
          return acc
        },
        [[], []],
      ),
    [countries],
  )
}
