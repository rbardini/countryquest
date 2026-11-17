import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource-variable/dosis'
import type { AppProps } from 'next/app'
import { evolu, EvoluProvider } from '../lib/evolu'
import { ToastContainer } from '../lib/toast'
import theme from '../theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <EvoluProvider value={evolu}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <ToastContainer />
      </ChakraProvider>
    </EvoluProvider>
  )
}

export default App
