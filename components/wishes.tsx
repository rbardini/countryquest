import { useAtom } from 'jotai'
import { wishesAtom } from '../atoms/countries'
import Countries from './countries'

export default function Wishes() {
  const [
    {
      loading,
      data: [wishedCountriesData, unwishedCountriesData],
    },
    setWishes,
  ] = useAtom(wishesAtom)

  return (
    <Countries
      isLoading={loading}
      excludedCountriesData={unwishedCountriesData}
      includedCountriesData={wishedCountriesData}
      onCountryChange={setWishes}
      title="Travel wishlist"
    />
  )
}
