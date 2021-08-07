import { useCallback, useState } from 'react'

export default function useCountries(storageKey) {
  const [countries, setCountries] = useState(
    new Set(JSON.parse(localStorage.getItem(storageKey))),
  )

  const toggleCountry = useCallback(
    id =>
      setCountries(countries => {
        countries.delete(id) || countries.add(id)
        localStorage.setItem(storageKey, JSON.stringify([...countries]))
        return new Set(countries)
      }),
    [storageKey],
  )

  return [countries, toggleCountry]
}
