import type { PropsWithChildren } from 'react'
import { createContext, useMemo } from 'react'
import useCountries from '../hooks/use-countries'

export const CountriesContext = createContext<{
  visits: ReturnType<typeof useCountries>
  wishes: ReturnType<typeof useCountries>
} | null>(null)

export default function CountriesProvider(props: PropsWithChildren<{}>) {
  const visits = useCountries('visits')
  const wishes = useCountries('wishes')

  const value = useMemo(() => ({ visits, wishes }), [visits, wishes])

  return <CountriesContext.Provider value={value} {...props} />
}
