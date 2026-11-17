import { useCallback, useMemo } from 'react'
import { CountryData } from '../data/geodata'
import {
  brandedIdToCountryId,
  CountriesRow,
  countryDataById,
  countryIdToBrandedId,
  formatTypeError,
  getCountryDataByCountryId,
  Query,
  sqliteFalse,
  sqliteTrue,
  Table,
  useEvolu,
  useQuery,
} from '../lib/evolu'
import { toast } from '../lib/toast'

export default function useCountries(table: Table, query: Query<CountriesRow>) {
  const { upsert } = useEvolu()
  const countries = useQuery(query)

  const [includedCountriesData, excludedCountriesData] = useMemo(() => {
    const countriesSet = new Set(
      countries.map(({ id }) => brandedIdToCountryId(id)),
    )
    return Object.values(countryDataById).reduce<
      [CountryData[], CountryData[]]
    >(
      (acc, data) => (acc[+!countriesSet.has(data.id)].push(data), acc),
      [[], []],
    )
  }, [countries])

  const onAddCountry = useCallback(
    (id: string) => {
      const result = upsert(table, {
        id: countryIdToBrandedId(id),
        isDeleted: sqliteFalse,
      })
      if (result.ok) return

      toast({
        status: 'error',
        title: `Oops, we couldn't add ${getCountryDataByCountryId(id)?.name ?? 'this country'} to your ${table} 😕`,
        description: formatTypeError(result.error),
      })
    },
    [upsert, table],
  )

  const onRemoveCountry = useCallback(
    (id: string) => {
      const result = upsert(table, {
        id: countryIdToBrandedId(id),
        isDeleted: sqliteTrue,
      })
      if (result.ok) return

      toast({
        status: 'error',
        title: `Oops, we couldn't remove ${getCountryDataByCountryId(id)?.name ?? 'this country'} from your ${table} 😕`,
        description: formatTypeError(result.error),
      })
    },
    [upsert, table],
  )

  return {
    includedCountriesData,
    excludedCountriesData,
    onAddCountry,
    onRemoveCountry,
  }
}
