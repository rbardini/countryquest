import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource-variable/dosis'
import { useAtomValue, useSetAtom } from 'jotai'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import countriesAtom from '../atoms/countries'
import toastAtom from '../atoms/toast'
import userAtom from '../atoms/user'
import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  const user = useAtomValue(userAtom)
  const fetchCountries = useSetAtom(countriesAtom)
  const { ToastContainer } = useAtomValue(toastAtom)

  // Use `useEffect` hook to fetch countries on user change,
  // since Jotai doesn't have atom effects API.
  // https://github.com/pmndrs/jotai/issues/211
  useEffect(() => {
    fetchCountries()
  }, [user, fetchCountries])

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <ToastContainer />
    </ChakraProvider>
  )
}

export default App
