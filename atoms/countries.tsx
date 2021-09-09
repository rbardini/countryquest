import type { UseToastOptions } from '@chakra-ui/react'
import { createStandaloneToast } from '@chakra-ui/react'
import type { PostgrestError } from '@supabase/supabase-js'
import { atom } from 'jotai'
import userAtom from '../atoms/user'
import type { CountryData } from '../data/geodata'
import geodata from '../data/geodata'
import supabase from '../lib/supabase'
import theme from '../theme'

type Table = 'visits' | 'wishes'
type Row = { user_id: string; country_id: string }
type Value = {
  loading: boolean
  error: PostgrestError | null
  countries: Set<string>
}
type ValueWithData = Value & {
  data: [included: CountryData[], excluded: CountryData[]]
}
type Update = { action: 'add' | 'remove'; id: string }
export type Updater = (update: Update) => void

const initialState: Value = {
  loading: true,
  error: null,
  countries: new Set(),
}

const toast = createStandaloneToast({ theme })
const showError = (props: UseToastOptions) =>
  toast({
    status: 'error',
    position: 'bottom-right',
    duration: 15000,
    isClosable: true,
    ...props,
  })

const getCountryName = (countryId: string) =>
  geodata.features.find(({ id }) => id === countryId)?.properties.name

const countriesAtomCreator = (table: Table) => {
  const countriesAtom = atom(initialState)

  const fetchCountriesAtom = atom<Value, Table>(
    get => get(countriesAtom),
    (_get, set, table) => {
      ;(async () => {
        const response = await supabase.from<Row>(table).select('country_id')

        if (response.error) {
          console.error(response.error.message)

          set(countriesAtom, prevState => ({
            ...prevState,
            loading: false,
            error: response.error,
          }))

          return
        }

        set(countriesAtom, prevState => ({
          ...prevState,
          loading: false,
          error: null,
          countries: new Set(response.data.map(({ country_id }) => country_id)),
        }))
      })()
    },
  )
  fetchCountriesAtom.onMount = fetchCountries => fetchCountries(table)

  const countriesDataAtom = atom(get => {
    const countries = get(fetchCountriesAtom)

    const data = geodata.features.reduce<[CountryData[], CountryData[]]>(
      (acc, { id, properties }) => {
        acc[+!countries.countries.has(id)].push(properties)
        return acc
      },
      [[], []],
    )

    return { ...countries, data }
  })

  const countriesUpdaterAtom = atom<ValueWithData, Update>(
    get => get(countriesDataAtom),
    (get, set, { action, id }) => {
      const user = get(userAtom)

      const toggleCountry = (id: string, toggle: boolean) =>
        set(countriesAtom, prevState => {
          if (toggle) prevState.countries.add(id)
          else prevState.countries.delete(id)

          return { ...prevState, countries: new Set(prevState.countries) }
        })

      switch (action) {
        case 'add':
          if (!user) {
            toggleCountry(id, true)
            return
          }

          ;(async () => {
            const { error } = await supabase
              .from<Row>(table)
              .insert(
                { user_id: user.id, country_id: id },
                { returning: 'minimal' },
              )

            if (error) {
              console.error(error.message)

              showError({
                title: `Oops, we couldn't add ${
                  getCountryName(id) ?? 'this country'
                } to your ${table} 😕`,
                description: 'Sorry about that, you can try again later.',
              })
            } else toggleCountry(id, true)
          })()
          break

        case 'remove':
          if (!user) {
            toggleCountry(id, false)
            return
          }

          ;(async () => {
            const { error } = await supabase
              .from<Row>(table)
              .delete()
              .match({ country_id: id })

            if (error) {
              console.error(error.message)

              showError({
                title: `Oops, we couldn't remove ${
                  getCountryName(id) ?? 'this country'
                } from your ${table} 😕`,
                description: 'Sorry about that, you can try again later.',
              })
            } else toggleCountry(id, false)
          })()
          break
      }
    },
  )

  return countriesUpdaterAtom
}

export const visitsAtom = countriesAtomCreator('visits')
export const wishesAtom = countriesAtomCreator('wishes')
