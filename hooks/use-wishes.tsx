import { useContext } from 'react'
import { CountriesContext } from '../components/countries-provider'

export default function useWishes() {
  const context = useContext(CountriesContext)

  if (context === undefined) {
    throw new Error(`useWishes must be used within a CountriesContext.`)
  }

  return context!.wishes
}
