import type { UseToastOptions } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import type { PostgrestError } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import supabase from '../lib/supabase'
import useUser from './use-user'

type Table = 'visits' | 'wishes'
type Row = { user_id: string; country_id: string }
type State = {
  loading: boolean
  error: PostgrestError | null
  countries: Set<string>
}
export type CountryChangeHandler = (
  id: string,
) => Promise<{ error: PostgrestError | null }>

export default function useCountries(table: Table) {
  const [state, setState] = useState<State>({
    loading: true,
    error: null,
    countries: new Set(),
  })
  const user = useUser()
  const toast = useToast()
  const showError = useCallback(
    (props: UseToastOptions) =>
      toast({
        status: 'error',
        position: 'bottom-right',
        duration: 15000,
        isClosable: true,
        ...props,
      }),
    [toast],
  )

  const toggleCountry = useCallback((id: string, toggle: boolean) => {
    setState(prevState => {
      if (toggle) prevState.countries.add(id)
      else prevState.countries.delete(id)

      return { ...prevState, countries: new Set(prevState.countries) }
    })
  }, [])

  useEffect(() => {
    if (!user) {
      setState(prevState => ({
        ...prevState,
        loading: false,
        error: null,
      }))
      return
    }

    let disposed = false

    ;(async () => {
      const response = await supabase.from<Row>(table).select('country_id')

      if (disposed) return

      if (response.error) {
        console.error(response.error.message)

        showError({
          title: `Oops, we couldn't get your ${table} 😕`,
          description:
            'You can continue working, but your changes may not be saved.',
        })

        setState(prevState => ({
          ...prevState,
          loading: false,
          error: response.error,
        }))

        return
      }

      setState(prevState => ({
        ...prevState,
        loading: false,
        error: null,
        countries: new Set(response.data.map(({ country_id }) => country_id)),
      }))
    })()

    return () => {
      disposed = true
    }
  }, [showError, table, user])

  const addCountry = useCallback<CountryChangeHandler>(
    async id => {
      if (!user) {
        toggleCountry(id, true)
        return { error: null }
      }

      const { error } = await supabase
        .from<Row>(table)
        .insert({ user_id: user.id, country_id: id }, { returning: 'minimal' })

      if (error) {
        console.error(error.message)

        showError({
          title: `Ouch, we couldn't add this country to your ${table} 😕`,
          description:
            'We had to undo your change, but you can try again later.',
        })
      } else toggleCountry(id, true)

      return { error }
    },
    [showError, table, toggleCountry, user],
  )

  const removeCountry = useCallback<CountryChangeHandler>(
    async id => {
      if (!user) {
        toggleCountry(id, false)
        return { error: null }
      }

      const { error } = await supabase
        .from<Row>(table)
        .delete()
        .match({ country_id: id })

      if (error) {
        console.error(error.message)

        showError({
          title: `Ouch, we couldn't remove this country from your ${table} 😕`,
          description:
            'We had to undo your change, but you can try again later.',
        })
      } else toggleCountry(id, false)

      return { error }
    },
    [showError, table, toggleCountry, user],
  )

  return [state, addCountry, removeCountry] as const
}
