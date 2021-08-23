import { useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import supabase from '../lib/supabase'
import useUser from './use-user'

export default function useCountries(table) {
  const [state, setState] = useState({
    loading: true,
    error: undefined,
    countries: new Set(),
  })
  const user = useUser()
  const toast = useToast()
  const showError = useCallback(
    props =>
      toast({
        status: 'error',
        position: 'bottom-right',
        duration: 15000,
        isClosable: true,
        ...props,
      }),
    [toast],
  )

  const toggleCountry = useCallback((id, toggle) => {
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
        error: undefined,
      }))
      return
    }

    let disposed = false

    ;(async () => {
      const { data, error } = await supabase.from(table).select('country_id')

      if (disposed) return

      if (error) {
        console.error(error.message)

        showError({
          title: `Oops, we couldn't get your ${table} 😕`,
          description:
            'You can continue working, but your changes may not be saved.',
        })

        setState(prevState => ({ ...prevState, loading: false, error }))
      } else {
        setState(prevState => ({
          ...prevState,
          loading: false,
          error: undefined,
          countries: new Set(data.map(({ country_id }) => country_id)),
        }))
      }
    })()

    return () => (disposed = true)
  }, [showError, table, user])

  const addCountry = useCallback(
    async id => {
      if (!user) {
        toggleCountry(id, true)
        return {}
      }

      const { error } = await supabase
        .from(table)
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

  const removeCountry = useCallback(
    async id => {
      if (!user) {
        toggleCountry(id, false)
        return {}
      }

      const { error } = await supabase
        .from(table)
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

  return [state, addCountry, removeCountry]
}
