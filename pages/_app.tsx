import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/dosis/variable.css'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import countriesAtom from '../atoms/countries'
import userAtom from '../atoms/user'
import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  const user = useAtomValue(userAtom)
  const fetchCountries = useUpdateAtom(countriesAtom)

  // Use `useEffect` hook to fetch countries on user change,
  // since Jotai doesn't have atom effects API.
  // https://github.com/pmndrs/jotai/issues/211
  useEffect(() => {
    fetchCountries()
  }, [user, fetchCountries])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
