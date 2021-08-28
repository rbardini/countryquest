import { useContext } from 'react'
import { CountriesContext } from '../components/countries-provider'

export default function useVisits() {
  const context = useContext(CountriesContext)

  if (context === undefined) {
    throw new Error(`useVisits must be used within a CountriesContext.`)
  }

  return context.visits
}
