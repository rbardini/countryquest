import { wishesQuery } from '../lib/evolu'
import useCountries from './use-countries'

export default function useWishedCountries() {
  const {
    includedCountriesData: wishedCountriesData,
    excludedCountriesData: unwishedCountriesData,
    onAddCountry: onAddWishedCountry,
    onRemoveCountry: onRemoveWishedCountry,
  } = useCountries('wishes', wishesQuery)

  return {
    wishedCountriesData,
    unwishedCountriesData,
    onAddWishedCountry,
    onRemoveWishedCountry,
  }
}
