import { useAtom } from 'jotai'
import { visitsAtom } from '../atoms/countries'
import Countries from './countries'

export default function Visits() {
  const [
    {
      loading,
      data: [visitedCountriesData, unvisitedCountriesData],
    },
    setVisits,
  ] = useAtom(visitsAtom)

  return (
    <Countries
      isLoading={loading}
      excludedCountriesData={unvisitedCountriesData}
      includedCountriesData={visitedCountriesData}
      onCountryChange={setVisits}
      title="Visited countries"
    />
  )
}
