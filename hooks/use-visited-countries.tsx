import { visitsQuery } from '../lib/evolu'
import useCountries from './use-countries'

export default function useVisitedCountries() {
  const {
    includedCountriesData: visitedCountriesData,
    excludedCountriesData: unvisitedCountriesData,
    onAddCountry: onAddVisitedCountry,
    onRemoveCountry: onRemoveVisitedCountry,
  } = useCountries('visits', visitsQuery)

  return {
    visitedCountriesData,
    unvisitedCountriesData,
    onAddVisitedCountry,
    onRemoveVisitedCountry,
  }
}
