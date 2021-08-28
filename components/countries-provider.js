import { createContext, useMemo } from 'react'
import useCountries from '../hooks/use-countries'

export const CountriesContext = createContext()

export default function CountriesProvider(props) {
  const visits = useCountries('visits')
  const wishes = useCountries('wishes')

  const value = useMemo(() => ({ visits, wishes }), [visits, wishes])

  return <CountriesContext.Provider value={value} {...props} />
}
